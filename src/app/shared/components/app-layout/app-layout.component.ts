import {Component, OnInit, ViewChild} from '@angular/core';
import {AppMenuItem} from '../../models/app-menu-item';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {PermissionMode} from '../../models/permission-mode';
import {AppUser} from '../../models/app-user';
import {map, Observable, take} from 'rxjs';
import {StringHelper} from '../../helpers/string-helper';
import {OverlayPanel} from 'primeng/overlaypanel';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent implements OnInit {

  protected portalName!: string;
  protected menuItems!: AppMenuItem[];
  protected userMenuItems!: MenuItem[];
  menuOpened = false;

  constructor(protected authService: AuthService, protected router: Router) {
  }

  @ViewChild('profileMenu') profileMenu!: OverlayPanel;

  toggleProfileMenu(event: Event) {
    this.profileMenu.toggle(event);
  }

  ngOnInit() {
    this.userMenuItems = [
      {
        label: 'User',
        items: [
          {
            label: 'Log out',
            icon: 'pi pi-refresh',
            command: () => {
              this.logout();
            }
          }
        ]
      }
    ];
  }

  get currentUser$(): Observable<AppUser | null> {
    return this.authService.currentUser$;
  }

  logout(): void {
    this.authService.logout().subscribe();
  }

  hasIcon(menuItem: AppMenuItem): boolean {
    return !StringHelper.isNullOrWhitespace(menuItem.icon);
  }

  getRouterLink(menuItem: AppMenuItem): string[] | null {
    if (!StringHelper.isNullOrWhitespace(menuItem.routerLink)) {
      return [menuItem.routerLink!];
    }
    return null;
  }

  navigate(location: string) {
    if (!StringHelper.isNullOrWhitespace(location)) {
      this.router.navigate(['users']);
    }
  }

  private setMenuItemVisibility(item: AppMenuItem): void {
    this.authService.currentUser$.pipe(take(1),
      map((user: AppUser | null) => {
        if (!user) {
          item.visible = false;
        }

        if (!item.alwaysVisible && item.permissionsRequired) {
          if (item.permissionMode == PermissionMode.RequireAll) {
            item.visible = item.permissionsRequired.every((permission) =>
              user?.permissions.includes(permission));
          }
          else {
            item.visible = item.permissionsRequired.some((permission) =>
            user?.permissions.includes(permission));
          }
        }

        if (item.items && item.items.length > 0) {
          item.items.forEach(subItem => {
            this.setMenuItemVisibility(subItem);
          });

          if (item.items.every(i => !i.visible)) {
            item.visible = false;
          }
        }
      })
    ).subscribe();
  }

  updateMenuItemVisibility(): void {
    this.menuItems.forEach(item => {
      this.setMenuItemVisibility(item);
    });
  }

  protected readonly PrimeIcons = PrimeIcons;
}
