import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CurrentConnectionService, ConnectionEvent } from '../current-connection';
import { Connection, Connectors, Connector, TypeFactory } from '../../../model';
import { ConnectorStore } from '../../../store/connector/connector.store';

@Component({
  selector: 'syndesis-connections-connection-basics',
  templateUrl: 'connection-basics.component.html',
})
export class ConnectionsConnectionBasicsComponent implements OnInit {

  loading: Observable<boolean>;
  connectors: Observable<Connectors>;
  filteredConnectors: Subject<Connectors> = new BehaviorSubject(<Connectors>{});

  constructor(
    private current: CurrentConnectionService,
    private connectorStore: ConnectorStore,
  ) {
    this.loading = connectorStore.loading;
    this.connectors = connectorStore.list;
  }

  ngOnInit() {
    this.connectorStore.loadAll();
  }

  onSelected(connector: Connector) {
    const connection = TypeFactory.createConnection();
    const plain = connector['plain'];
    if (plain && typeof plain === 'function') {
      connection.connector = plain();
    } else {
      connection.connector = connector;
    }
    connection.icon = connector.icon;
    connection.connectorId = connector.id;
    this.current.connection = connection;
  }

}
