# FitZone

Una aplicación móvil para la gestión de clases de fitness y reservas de gimnasio, desarrollada con React Native.

## 📱 Estructura del Proyecto

```
FitZone/
├── src/
│   ├── actions/           # Acciones de API
│   ├── common/
│   │   ├── api/          # Configuración del backend
│   │   ├── components/   # Componentes reutilizables
│   │   ├── helpers/      # Utilidades y helpers
│   │   ├── hooks/        # Custom hooks
│   │   └── store/        # Estado global
│   ├── routers/          # Navegación de la app
│   └── screens/          # Pantallas de la aplicación
│       ├── auth/         # Pantallas de autenticación
│       │   ├── login/
│       │   └── register/
│       └── main/         # Pantallas principales
│           ├── home/     # Inicio
│           ├── class/    # Lista de clases
│           ├── profile/  # Perfil de usuario
│           └── reservations/ # Reservas
├── android/              # Configuración Android
├── ios/                  # Configuración iOS
└── __tests__/           # Tests
```

## 🚀 Cómo Ejecutar

### Prerrequisitos

- Node.js (v16 o superior)
- React Native CLI
- Android Studio (para Android)
- Xcode (para iOS - solo macOS)
- Bun (gestor de paquetes)

### Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/DevACampuzano/Fitzone
   cd FitZone
   ```

2. **Instalar dependencias**

   ```bash
   bun install
   ```

3. **Configurar iOS (solo macOS)**
   ```bash
   cd ios
   pod install
   cd ..
   ```

### Ejecutar la Aplicación

#### Android

```bash
# Iniciar Metro bundler
bun start

# En otra terminal, ejecutar en Android
bun android
```

#### iOS (solo macOS)

```bash
# Iniciar Metro bundler
bun start

# En otra terminal, ejecutar en iOS
bun ios
```

## 🏗️ Arquitectura

- **Frontend**: React Native con TypeScript
- **Navegación**: React Navigation (Tab y Stack navigators)
- **Estado Global**: Zustand
- **HTTP Client**: TanStack Query para manejo de estado del servidor
- **UI**: Componentes nativos + react-native-vector-icons
- **Validación**: Custom hooks para formularios

## 📋 Funcionalidades

- ✅ Autenticación de usuarios (Login/Registro)
- ✅ Visualización de clases destacadas
- ✅ Lista de clases disponibles con filtros
- ✅ Sistema de reservas
- ✅ Perfil de usuario
- ✅ Notificaciones Toast
- ✅ Progreso del usuario
