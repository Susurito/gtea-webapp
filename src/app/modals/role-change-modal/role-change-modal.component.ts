import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-role-change-modal',
  imports: [],
  templateUrl: './role-change-modal.component.html',
  styleUrl: './role-change-modal.component.scss'
})
export class RoleChangeModalComponent {
  @Input() isOpen: boolean = false; // Abrir/Cerrar modal
  @Input() selectedUser: { id: number, name: string, role: string } | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() confirmRoleChange = new EventEmitter<{ userId: number, newRole: string }>();

  newRole: string = '';
  confirmDialogOpen: boolean = false;

  getRoleBadgeColor(role: string): string {
    switch (role) {
      case 'admin': return 'badge-admin';
      case 'organizer': return 'badge-organizer';
      case 'student': return 'badge-student';
      default: return 'badge-default';
    }
  }

  openConfirm() {
    if (this.newRole) {
      this.confirmDialogOpen = true;
    }
  }

  finalConfirm() {
    if (this.selectedUser && this.newRole) {
      this.confirmRoleChange.emit({ userId: this.selectedUser.id, newRole: this.newRole });
      this.closeModal();
    }
  }

  closeModal() {
    this.isOpen = false;
    this.confirmDialogOpen = false;
    this.newRole = '';
    this.close.emit();
  }
}
