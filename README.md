# Angular Change Detection and Hierarchical Dependency Injection Example

## Overview

This project demonstrates two key concepts in Angular:

1. **Change Detection Strategies**: How Angular detects and updates changes in components.
2. **Hierarchical Dependency Injection (DI)**: How services are injected at different levels of the component hierarchy.

## Change Detection Strategies

### Impact on Performance

Angular uses two main change detection strategies:

1. **Default**: Checks the entire component tree for changes. This can be less efficient, especially in large applications, as it runs frequently and checks all components.
   
2. **OnPush**: Optimizes performance by only checking the component when its input properties change, an event occurs, or an observable emits a new value. This reduces the frequency of change detection checks.

### When to Use Each Strategy

- **Default**: Use when you need to ensure that all changes are detected in the component tree. Suitable for smaller or simpler applications where performance is not a major concern.
  
- **OnPush**: Use for larger applications or components with immutable data. This strategy improves performance by reducing the number of change detection checks. Ideal for components with stable data or when using observables.

## Hierarchical Dependency Injection (DI)

### Benefits and Use Cases

1. **Hierarchical DI**: Angular's DI system allows you to provide services at different levels of the component hierarchy (root, parent, child). This provides flexibility and control over service instances and their scope.

2. **Benefits**:
   - **Scoped Services**: Services can be provided at different levels (e.g., application-wide, module-wide, or component-wide).
   - **Encapsulation**: Services can be encapsulated within specific components or modules, avoiding unnecessary exposure.
   - **Efficiency**: Reduces memory usage and potential conflicts by controlling service instances.

### Example Usage

- **Root Level**: A service provided in the root injector is available throughout the application.
- **Parent Component**: A service provided in a parent component's injector is available to that component and its children.
- **Child Component**: A service provided in a child component's injector is only available within that child component.

## Project Setup

### Components

- **Parent Component**: Manages a form to add employee data and displays the list of employees. Uses `ChangeDetectionStrategy.Default`.
- **Child Component**: Displays the list of employees passed from the parent component. Uses `ChangeDetectionStrategy.OnPush`.
