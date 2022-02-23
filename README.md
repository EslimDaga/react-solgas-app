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

### Mostrar Conductores

Mostrar todos los conductores

### `/control/web/api/get-drivers/`

### Mostrar conductor por DNI

Mostrar conductor por su DNI

### `/control/web/api/get-driver/<int:dni>/`

### Crear conductores

Crear Conductores

### `/control/web/api/create-driver/`

### Eliminar Conductores por DNI

Eliminar Conductores por su DNI

### `/control/web/api/delete-driver/<int:dni>/`

### Obtener Unidades

Obtener todas las unidades

### `/control/web/api/get-units/`

### Obtener Unidades por Nº DE PLACA

Obtener unidades por Nº DE PLACA

### `control/web/api/get-unit/<str:license_plate>/`

### Crear Unidades

Crear Unidades

### `/control/web/api/create-unit/`

### Eliminar Unidades

Eliminar Unidad

### `/control/web/api/delete-unit/<str:license_plate>/`