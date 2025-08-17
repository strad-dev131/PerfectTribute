# Birthday Tribute Website for Vivaan

## Overview

This is a personalized birthday tribute website built for Vivaan, celebrating his achievements, personality, and charm. The website features a blend of Hindi and English (Hinglish) content to create a warm, personal touch. It includes interactive features like an AI-powered sayari generator, a countdown timer to Vivaan's birthday, birthday wishes collection, and showcases of his leadership skills and personality traits.

The application is designed as a modern full-stack web application with a focus on performance, aesthetics, and user engagement while maintaining simplicity and elegance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and modern development practices
- **Styling**: Tailwind CSS with shadcn/ui components for consistent, modern UI design
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds
- **Custom Theme**: Dark theme with neon cyan and gold accents, custom CSS variables for birthday-specific styling

### Backend Architecture
- **Framework**: Express.js with TypeScript for the REST API server
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: In-memory storage with fallback to database storage
- **API Design**: RESTful endpoints for birthday wishes and sayari generation
- **Development Server**: Integration with Vite for hot module replacement in development

### Database Schema
- **Users Table**: Basic user management with username/password authentication
- **Birthday Wishes Table**: Stores user-submitted birthday messages with sender name, message content, and timestamps
- **Generated Sayaris Table**: Stores AI-generated sayaris with mood categorization and creation timestamps
- **Database Provider**: Uses Neon Database (serverless PostgreSQL) for production deployment

### Key Features Implementation
- **Countdown Timer**: Custom React hook for real-time countdown to August 18, 2025
- **AI Sayari Generator**: Integration with OpenAI API to generate personalized Hinglish poetry based on mood selection
- **Interactive Wishes System**: Users can submit and view birthday wishes with real-time updates
- **Responsive Design**: Mobile-first approach with smooth animations and glass-morphism effects
- **Performance Optimization**: Static content prioritization with minimal interactive features for optimal loading

### Development Workflow
- **Environment**: Designed for Replit deployment with specific configurations
- **Build Process**: Separate client and server build processes with ESBuild for server-side bundling
- **Development Mode**: Hot reload capabilities with error overlay for debugging
- **Type Safety**: Comprehensive TypeScript configuration covering client, server, and shared code

## External Dependencies

### Third-Party Services
- **OpenAI API**: GPT-4o model for generating personalized Hinglish sayaris based on user mood selection
- **Neon Database**: Serverless PostgreSQL database for production data storage
- **Replit Platform**: Development and hosting environment with specific integrations

### UI Framework Dependencies
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives for components like dialogs, dropdowns, and form elements
- **shadcn/ui**: Pre-built component library built on top of Radix UI with Tailwind CSS styling
- **Lucide React**: Icon library for consistent iconography throughout the application

### Core Libraries
- **Drizzle ORM**: Type-safe database toolkit for PostgreSQL with schema definition and migration support
- **TanStack Query**: Data fetching and caching library for efficient server state management
- **Date-fns**: Date utility library for countdown timer functionality
- **Zod**: Schema validation library for API request/response validation and type safety

### Development Tools
- **Vite**: Build tool and development server with hot module replacement
- **ESBuild**: Fast bundler for server-side code compilation
- **TypeScript**: Type system for enhanced developer experience and code reliability
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development