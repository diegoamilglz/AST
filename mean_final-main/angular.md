# Angular notas
Angular es un framework para aplicaciones web desarrollado en TypeScript, de código abierto, mantenido por Google, que se utiliza para crear y mantener aplicaciones web de una sola página.

<!-- # Funcionalidad
Angular carga el [modulo](#modulos) principal que se llama  -->


# Componentes
Los componentes se pueden crear de dos formas diferentes:
1. Manual
2. Mediante cli (recomendada)
   
## Manual
Hacerlo de manera manual no es la mejor opción pues te puedes equivoca sinembargo es la mejor opcion si quieres aprender angular pues sabras como esta echo.

### Pasos de diseño
1. Crearemos una carpeta en la carpeta app y la llamaremos como nuestro componente.
2. dentro de ella crearemos los archivo siguientes
   1. nombre.component.css
   2. nombre.component.html
   3. nombre.component.spec.ts
   4. nombre.component.ts
3. Procedemos a editar dichos archivos
   
### nombre.component.ts
Aquí vamos a definir una clase y un decorador. Por motivos de la aplicacion nosotros vamos a crear la clase monitores.
`nota`: Acordarse de hacer el export para que la clase sea accedida desde fuera.
[Aqui](angular/app/../src/app/components/monitores/monitores.component.ts) esta el archivo


### Registro
Para que angular sepa que hemos creado una aplicación necesitamos decirselo. Para esto vamos al directorio [app.modules.ts](angular/src/app/app.module.ts) y lo configuramos.

```typescript
// importamos el componente
import { MonitoresComponent } from './components/monitores/monitores.component';


@NgModule({
  declarations: [
    AppComponent,
    MonitoresComponent // Usamos el componente aqui declarandolo
  ]
})
```

Despues de esto ya podriamos ir al fichero [html principal](angular/src/app/app.component.html) y añadir nuestro componente de esta forma
```html
<app-monitores></app-monitores>
```

## Mediante cli
Mediante cli es la manera mas facil y rápida de crear un componente y simplemente es 
> ng generate component monitor

O de la forma acortada

> ng g c monitor

# Interpolacion
[video](https://www.youtube.com/watch?v=KfYyWNqJaVc&list=PLU8oAlHdN5BnNAe8zXnuBNzKID39DUwcO&index=7)
La interpolacion de texto permite crear texto dinámico en nuestra aplicacion. Es decir es un texto que puede cambiar segun la ejecución del programa

# Biding
[video](https://www.youtube.com/watch?v=ILO7-5Hnxt8&list=PLU8oAlHdN5BnNAe8zXnuBNzKID39DUwcO&index=9)
Vincular un objeto de una pagina web con sus propiedades

