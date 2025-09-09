# Flight Simulator Application

## Overview

This is a 3D flight simulator web application built with React and Three.js. The application provides an immersive flight experience with realistic physics, 3D graphics, and interactive controls. Users can pilot an aircraft through a procedurally generated terrain using keyboard controls, with a heads-up display (HUD) showing flight data like altitude, speed, heading, and throttle position.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for component-based UI development
- **Three.js ecosystem** (@react-three/fiber, @react-three/drei, @react-three/postprocessing) for 3D rendering and graphics
- **Vite** as the build tool and development server with hot module replacement
- **Tailwind CSS** with shadcn/ui components for styling and UI elements
- **Zustand** for lightweight state management across flight controls, game state, and audio

### Component Structure
- **App.tsx**: Main application entry point with Canvas setup and keyboard controls
- **FlightSimulator**: Core 3D scene coordinator
- **Airplane**: Aircraft physics and rendering with realistic flight dynamics
- **Terrain**: Procedurally generated landscape with grass textures
- **Sky**: Spherical skybox for atmospheric rendering
- **HUD**: Heads-up display overlay showing flight instruments
- **Lights**: 3D scene lighting setup with shadows

### State Management
The application uses Zustand stores for different concerns:
- **useFlightControls**: Aircraft position, rotation, velocity, and flight data
- **useGame**: Game phases (ready, playing, ended) and lifecycle management
- **useAudio**: Sound system with mute/unmute functionality

### Physics System
Custom flight physics engine (`flightPhysics.ts`) handles:
- Aircraft movement with throttle control
- Angular velocity for pitch, yaw, and roll
- Realistic flight dynamics with damping
- Ground collision and altitude constraints

### Input System
Keyboard controls using @react-three/drei KeyboardControls:
- WASD for basic movement
- Arrow keys for pitch and yaw
- Q/E for roll
- Shift/Ctrl for throttle control

## External Dependencies

### Core Framework Dependencies
- **React Three.js**: @react-three/fiber, @react-three/drei, @react-three/postprocessing for 3D rendering
- **Three.js**: Core 3D graphics library
- **React**: Frontend framework with hooks and context
- **TypeScript**: Type safety and development experience

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless UI components (@radix-ui/react-*)
- **shadcn/ui**: Pre-built component library
- **Lucide React**: Icon library
- **Inter Font**: Typography (@fontsource/inter)

### State and Data Management
- **Zustand**: Lightweight state management
- **React Query**: Data fetching and caching (@tanstack/react-query)
- **React Hook Form**: Form handling
- **Zod**: Schema validation

### Development and Build Tools
- **Vite**: Build tool and development server
- **ESBuild**: Fast JavaScript bundler
- **PostCSS**: CSS processing with Autoprefixer
- **GLSL support**: Shader loading via vite-plugin-glsl

### Backend Infrastructure
- **Express.js**: Node.js web framework
- **Drizzle ORM**: Type-safe database operations
- **PostgreSQL**: Database (configured via @neondatabase/serverless)
- **Session management**: connect-pg-simple for PostgreSQL session storage

### Asset Support
- **3D Models**: .gltf, .glb file support
- **Audio**: .mp3, .ogg, .wav file support
- **Textures**: Image loading for terrain and sky materials

The application is designed as a full-stack solution with a React frontend for the 3D flight simulator and an Express backend with PostgreSQL for potential user data, scores, or flight records storage.
