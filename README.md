# Sinergia Canetana

Aplicacion web local para una campana politica universitaria.

## Arquitectura

- `backend`: API REST con Express, MongoDB, Mongoose, JWT, cookies y CRUD de noticias.
- `client`: React + Vite + Tailwind con sitio publico y panel administrador.

## Ejecutar localmente

1. Instalar dependencias:

```bash
npm run install:all
```

2. Levantar MongoDB local en `mongodb://127.0.0.1:27017`.

3. Ejecutar backend:

```bash
npm run dev:backend
```

4. Ejecutar frontend:

```bash
npm run dev:client
```

Frontend: `http://127.0.0.1:5173`
Backend: `http://localhost:3000/api`
