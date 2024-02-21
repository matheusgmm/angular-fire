import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, map } from 'rxjs';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';

export interface Item {
  key: string;
  email: string;
  name: string;
  age: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '' as string;
  password = '' as string;

  formNewName = '' as string;
  formNewAge = '' as string;

  listRef: any;
  list$: Observable<Item[]>;

  constructor(
    public auth: AuthService,
    private database: AngularFireDatabase
  ) {
    this.listRef = database.list('list');
    this.list$ = this.listRef.snapshotChanges().pipe(
      map((changes: SnapshotAction<Item>[]) =>
        changes.map((c) => ({key: c.payload.key, ...c.payload.val()}))
      )
    );
   }

  ngOnInit(): void {
      
  }

  addItem() {
    this.listRef.push({
      name: this.formNewName,
      age: this.formNewAge,
      email: this.auth.user.email
    });
    this.formNewName = '';
    this.formNewAge = '';
  }

  deleteItem(key: string) {
    this.listRef.remove(key);
  }
}
