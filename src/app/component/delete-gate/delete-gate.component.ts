import { Component, Input, Output, EventEmitter } from "@angular/core"

@Component({
  selector: "app-delete-gate",
  template: `
    <a href="javascript:void(0)" (click)="onDeleteClick($event)">Delete</a>
  `,
  styles: [],
})
export class DeleteGateComponent {
  @Input() gateId: string | undefined
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>()

  onDeleteClick(event: Event) {
    event.preventDefault() // Prevent the default behavior of the anchor tag
    if (this.gateId) {
      this.onDelete.emit(this.gateId)
    } else {
      console.warn("Attempting to delete with undefined gateId")
    }
  }
}
