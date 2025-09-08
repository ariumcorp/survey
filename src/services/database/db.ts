import { DatabaseService } from "./DatabaseService";

// --- ¡IMPORTANTE! Manejo de Credenciales ---
// Nunca guardes contraseñas directamente en el código.
// Usa variables de entorno.
const COUCHDB_USER = process.env.REACT_APP_COUCHDB_USER;
const COUCHDB_PASSWORD = process.env.REACT_APP_COUCHDB_PASSWORD;
const COUCHDB_HOST = process.env.REACT_APP_COUCHDB_HOST;
const REMOTE_DB_NAME = "surveys"; // O el nombre de tu base de datos remota

const remoteDbUrl = `http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@${COUCHDB_HOST}/${REMOTE_DB_NAME}`;
const localDbName = "local_surveys"; // Nombre para la base de datos en el navegador

// Creamos y exportamos la instancia única del servicio
export const dbService = new DatabaseService(localDbName, remoteDbUrl);
