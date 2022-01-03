# ✅ Checkpoint Solgas - Segursat ☢️

Este proyecto contiene un API con las siguientes rutas :

## URL 🚀

A continuación se redactará las rutas de la App

### Panel de Administración

Control total de la aplicación

### `/admin`

### Obtener Token

Obtener token JWT Authentication

### `/token/obtain/`

### Refrescar Token

Refrescar token JWT Authentication

### `/token/refresh/`

### Mostrar Eventos

Obtener todos los eventos

### `/control/web/api/get-events/`

### Mostrar Eventos por su ID

Obtener un evento por ID

### `/control/web/api/get-event/<int:id>/`

### Buscar Eventos

Buscar eventos con un rango de fecha

### `/control/web/api/search-events/<str:initial_date>/<str:final_date>/<str:license_plate>/`

### Imprimir Eventos

Imprimir eventos con un rango de fecha

### `/control/web/api/print-events/<str:initial_date>/<str:final_date>/<str:license_plate>/`

### Mostrar Checkpoints

Mostrar checkpoints

### `/control/web/api/get-checkpoints/`

### Mostrar Checkpoints por NAME

Mostrar checkpoints por NAME

### `/control/web/api/get-checkpoint/<str:name>/`

### Eliminar Checkpoints por NAME

Eliminar checkpoints por NAME

### `/control/web/api/delete-checkpoint/<str:name>/`

### Crear Checkpoints

Crear checkpoints

### `/control/web/api/create-checkpoint/`