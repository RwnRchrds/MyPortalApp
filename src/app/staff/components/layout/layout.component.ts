import {Component, OnInit} from '@angular/core';
import {AppLayoutComponent} from '../../../shared/components/app-layout/app-layout.component';
import {AuthService} from '../../../shared/services/auth.service';
import {Router} from '@angular/router';
import {AppPermission} from '../../../shared/enums/app-permission';
import {PrimeIcons} from 'primeng/api';

@Component({
  selector: 'app-staff-app-layout',
  templateUrl: '../../../shared/components/app-layout/app-layout.component.html',
  styleUrls: ['../../../shared/components/app-layout/app-layout.component.scss']
})
export class LayoutComponent extends AppLayoutComponent implements OnInit {
  constructor(protected override authService: AuthService, protected override router: Router) {
    super(authService, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.portalName = 'Staff Portal';
    this.menuItems = [
      {
        icon: PrimeIcons.HOME,
        label: 'Home',
        routerLink: 'home',
        alwaysVisible: true
      },
      {
        icon: PrimeIcons.LIST_CHECK,
        label: 'Assessment',
        items: [
          {
            label: 'Aspects',
            permissionsRequired: [AppPermission.AssessmentViewAspects],
            routerLink: ''
          },
          {
            label: 'Result Sets',
            permissionsRequired: [AppPermission.AssessmentViewResultSets],
            routerLink: ''
          },
          {
            label: 'Grade Sets',
            permissionsRequired: [AppPermission.AssessmentViewGradeSets],
            routerLink: ''
          },
          {
            label: 'Marksheets',
            permissionsRequired: [AppPermission.AssessmentViewOwnMarksheets, AppPermission.AssessmentViewAllMarksheets],
            routerLink: ''
          },
          {
            label: 'Marksheet Templates',
            permissionsRequired: [AppPermission.AssessmentViewMarksheetTemplates],
            routerLink: ''
          },
          {
            label: 'Examinations',
            permissionsRequired: [AppPermission.AssessmentViewExamBaseData],
            routerLink: ''
          },
          {
            label: 'Exam Assistant',
            permissionsRequired: [AppPermission.AssessmentRunExamAsst],
            routerLink: ''
          }
        ]
      },
      {
        icon: PrimeIcons.CLOCK,
        label: 'Attendance',
        items: [
          {
            label: 'Take Register',
            permissionsRequired: [AppPermission.AttendanceViewAttendanceMarks],
            routerLink: ''
          }
        ]
      },
      {
        icon: PrimeIcons.STAR,
        label: 'Behaviour',
        items: [
          {
            label: 'Detentions',
            permissionsRequired: [AppPermission.BehaviourViewDetentions],
            routerLink: ''
          }
        ]
      },
      {
        icon: PrimeIcons.CALENDAR,
        label: 'Calendar',
        items: [
          {
            label: 'School Diary',
            permissionsRequired: [AppPermission.SchoolViewSchoolDiary],
            routerLink: ''
          }
        ]
      },
      {
        icon: PrimeIcons.ENVELOPE,
        label: 'Communication',
        items: [
          {
            label: 'Send Email',
            routerLink: ''
          }
        ]
      },
      {
        icon: PrimeIcons.GRADUATION_CAP,
        label: 'Curriculum',
        items: [
          {
            label: 'Study Topics',
            permissionsRequired: [AppPermission.CurriculumViewStudyTopics],
            routerLink: ''
          }
        ]
      },
      {
        icon: PrimeIcons.BOOK,
        label: 'Documents',
        items: [
          {
            label: 'Documents',
            permissionsRequired: [AppPermission.SchoolViewSchoolDocuments],
            routerLink: ''
          }
        ]
      },
      {
        icon: PrimeIcons.MONEY_BILL,
        label: 'Finance',
        items: [
          {
            label: 'Accounts',
            permissionsRequired: [AppPermission.FinanceViewAccounts],
            routerLink: ''
          }
        ]
      },
      {
        icon: PrimeIcons.USERS,
        label: 'People',
        items: [
          {
            label: 'Students',
            permissionsRequired: [AppPermission.StudentViewStudentDetails],
            routerLink: ''
          },
          {
            label: 'Staff',
            permissionsRequired: [AppPermission.PeopleViewStaffBasicDetails],
            routerLink: ''
          },
          {
            label: 'Contacts',
            permissionsRequired: [AppPermission.PeopleViewContactDetails]
          },
          {
            label: 'Agents',
            permissionsRequired: [AppPermission.PeopleViewAgentDetails]
          }
        ]
      },
      {
        icon: PrimeIcons.BRIEFCASE,
        label: 'Personnel',
        items: [
          {
            label: 'Service Terms',
            routerLink: ''
          }
        ]
      },
      {
        icon: PrimeIcons.COMMENTS,
        label: 'Profiles',
        items: [
          {
            label: 'Reporting Sessions',
            routerLink: ''
          }
        ]
      },
      {
        icon: PrimeIcons.CHART_BAR,
        label: 'Reports',
        items: [
          {
            label: 'Definitions',
            permissionsRequired: [AppPermission.ProfilesViewReportingSessions],
            routerLink: ''
          }
        ]
      },
      {
        icon: PrimeIcons.BUILDING,
        label: 'School',
        items: [
          {
            label: 'Bulletins',
            permissionsRequired: [AppPermission.SchoolViewSchoolBulletins],
            routerLink: ''
          }
        ]
      },
      {
        icon: PrimeIcons.COG,
        label: 'Settings',
        items: [
          {
            label: 'Users',
            permissionsRequired: [AppPermission.SystemViewUsers],
            routerLink: 'users'
          }
        ]
      }
    ];

    this.updateMenuItemVisibility();
  }
}
