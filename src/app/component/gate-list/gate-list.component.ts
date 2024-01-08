import { Component, OnInit } from "@angular/core"
import { AngularFireDatabase } from "@angular/fire/compat/database"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"

@Component({
  selector: "app-gate-list",
  templateUrl: "./gate-list.component.html",
  styleUrls: ["./gate-list.component.css"],
})
export class GateListComponent implements OnInit {
  gates!: any[]

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    // Assuming you have a 'gateAccess' node in your Firebase Realtime Database
    this.db
      .list("/gateAccess")
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((c: any) => ({
            key: c.payload.key,
            ...c.payload.val(),
          }))
        })
      )
      .subscribe((gates: any[]) => {
        this.gates = gates
      })
  }

  deleteGate(gateId: string) {
    const gate = this.gates.find((g) => g.key === gateId)
    if (
      confirm(`Are you sure you want to delete gate with ID ${gate.gateId}?`)
    ) {
      this.db.list("/gateAccess").remove(gateId)
    }
  }
}
