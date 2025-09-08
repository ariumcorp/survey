import EventEmitter from "eventemitter3";
import PouchDB from "pouchdb-browser";
import { ReduxDispatch } from "redux-store/store";
import {
  addOrUpdateProcessedSurveys,
  addOrUpdateSurvey,
  removeSurvey,
} from "redux-store/thunk";

// Definimos los posibles estados de la replicación para usarlos en la UI
export type ReplicationStatus =
  | "active"
  | "paused"
  | "denied"
  | "error"
  | "idle";

export class DatabaseService {
  public localDb: PouchDB.Database;
  private remoteDb: PouchDB.Database;
  private replicationHandler?: PouchDB.Replication.Sync<{}>;
  public events: EventEmitter;

  constructor(localDbName: string, remoteDbUrl: string) {
    this.localDb = new PouchDB(localDbName);
    this.remoteDb = new PouchDB(remoteDbUrl);
    this.events = new EventEmitter();
    console.log(`Servicio de DB inicializado para: ${localDbName}`);
  }

  /**
   * Inicia la replicación continua (sincronización en vivo) entre la base de datos
   * local y la remota.
   */
  public startReplication(): void {
    if (this.replicationHandler) {
      console.log("La replicación ya está activa.");
      return;
    }

    const options: PouchDB.Replication.SyncOptions = {
      live: true, // Mantiene la conexión abierta para sincronización en tiempo real
      retry: true, // Reintenta la conexión si se pierde
    };

    console.log("Iniciando replicación...");
    this.events.emit("statusChange", "active");

    this.replicationHandler = this.localDb
      .sync(this.remoteDb, options)
      .on("change", (info) => {
        console.log("📦 Replicación: Hubo un cambio.", info);
        this.events.emit("change", info);
        this.events.emit("statusChange", "active");
      })
      .on("paused", (err) => {
        console.log("⏸ Replicación pausada.", err || "");
        this.events.emit("paused", err);
        this.events.emit("statusChange", "paused");
      })
      .on("complete", () => {
        console.log("✅ Replicación completa.");
        this.events.emit("complete");
        this.events.emit("statusChange", "complete");
      })
      .on("active", () => {
        console.log("Replicación reactivada.");
        this.events.emit("active");
        this.events.emit("statusChange", "active");
      })
      .on("denied", (err) => {
        console.error("⛔ Replicación denegada. Revisa las credenciales.", err);
        this.events.emit("denied", err);
        this.events.emit("statusChange", "denied");
      })
      .on("error", (err) => {
        console.error("❌ Error fatal en la replicación.", err);
        this.events.emit("error", err);
        this.events.emit("statusChange", "error");
      });
  }

  /**
   * Detiene la replicación continua.
   */
  public stopReplication(): void {
    if (this.replicationHandler) {
      this.replicationHandler.cancel();
      this.replicationHandler = undefined;
      this.events.emit("statusChange", "idle");
      console.log("Replicación detenida.");
    }
  }

  // --- Métodos de Ayuda (CRUD) ---

  public async getAllDocs() {
    return this.localDb.allDocs({ include_docs: true });
  }

  public async getDoc(id: string) {
    return this.localDb.get(id);
  }

  public async putDoc(doc: any) {
    // PouchDB requiere que el _id sea un string
    if (doc._id && typeof doc._id !== "string") {
      doc._id = String(doc._id);
    }
    console.log("putDoc", doc);
    return this.localDb.put(doc);
  }

  /**
   * Escucha los cambios en la base de datos local en tiempo real.
   * Emite eventos 'document-updated' o 'document-deleted'.
   */
  public listenForChanges(): void {
    this.localDb
      .changes({
        since: "now", // Escucha a partir de este momento
        live: true, // Mantiene la conexión abierta
        include_docs: true, // ¡Muy importante! Incluye el documento completo en el evento
      })
      .on("change", (change) => {
        if (change.deleted) {
          console.log("Documento eliminado:", change.id);
          this.events.emit("document-deleted", { id: change.id });
        } else {
          console.log("Documento actualizado/creado:", change.doc);
          this.events.emit("document-updated", change.doc);
        }
      })
      .on("error", (err) => {
        console.error("Error en el feed de cambios de PouchDB:", err);
      });
  }

  /**
   * ESTE ES EL NUEVO MÉTODO CENTRALIZADO
   * Recibe el 'dispatch' de Redux y configura los listeners globales.
   */
  public initializeListeners(dispatch: ReduxDispatch): void {
    this.localDb
      .changes({
        since: "now",
        live: true,
        include_docs: true,
      })
      .on("change", (change) => {
        // En lugar de emitir un evento, despacha directamente la acción de Redux
        if (change.deleted) {
          console.log("Listener Global: Documento eliminado ->", change.id);
          dispatch(removeSurvey({ id: change.id }));
        } else if (change.doc) {
          console.log("Listener Global: Documento actualizado ->", change.doc);
          // Asegúrate de que solo despachas documentos de encuestas (si tienes otros tipos)
          if (change.doc._id.startsWith("survey_")) {
            // O la condición que uses
            dispatch(addOrUpdateSurvey(change.doc as any));
          } else if (change.doc._id.startsWith("answer_")) {
            // O la condición que uses
            dispatch(addOrUpdateProcessedSurveys(change.doc as any));
          }
        }
      })
      .on("error", (err) => {
        console.error("Error en el listener global de PouchDB:", err);
      });

    console.log("✅ Listeners globales de PouchDB inicializados.");
  }
}
