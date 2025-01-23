import Typography from '@mui/material/Typography';

export default function FrequentlyAskedQuestions() {
  return (
    <div style={{ width: "70vw", height: "75vh", overflowY: "auto", paddingBottom: "1em" }}>
      <Typography id="modal-modal-title" variant="h5" component="h2">
        <b>Preguntas Frecuentes (FAQ)</b>
      </Typography>
      <br/>
      <h4 style={{ color: '#F71735', fontFamily: 'var(--font-poppins)' }}><b>Módulo de Cuentas</b></h4>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Encuentra respuestas a las preguntas más comunes relacionadas con las páginas de Registro, Inicio de Sesión y Restablecimiento de Contraseña.<br/><br/>

        <b>Página de Registro</b><br/>
        <b>1. ¿Cómo puedo registrarme en la plataforma?</b><br/>
        Para registrarte, ingresa tu dirección de correo electrónico válida y una contraseña segura. Asegúrate de usar al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales. Luego, haz clic en el botón de "Registro" para completar el proceso.<br/><br/>

        <b>2. ¿Qué hago si olvido mi contraseña?</b><br/>
        Si olvidaste tu contraseña, puedes restablecerla en la página de inicio de sesión. Haz clic en el enlace de "¿Olvidaste tu contraseña?" y sigue las instrucciones enviadas a tu correo electrónico para restablecerla.<br/><br/>

        <b>3. ¿Necesito leer los Términos y Condiciones antes de registrarme?</b><br/>
        Sí, es importante que revises nuestros Términos y Condiciones antes de registrarte. Asegúrate de aceptar los términos para completar el registro.<br/><br/>

        <b>4. ¿Qué hago si ya tengo una cuenta?</b><br/>
        Si ya tienes una cuenta, no es necesario registrarte nuevamente. Puedes iniciar sesión directamente desde el enlace "¿Ya tienes una cuenta?".<br/><br/>

        <b>Página de Inicio de Sesión</b><br/>
        <b>1. ¿Cómo puedo iniciar sesión en mi cuenta?</b><br/>
        Introduce tu dirección de correo electrónico asociada a tu cuenta y la contraseña que creaste durante el registro. Luego, haz clic en el botón de "Iniciar sesión" para acceder a tu cuenta.<br/><br/>

        <b>2. ¿Qué hago si olvidé mi contraseña?</b><br/>
        Si no recuerdas tu contraseña, haz clic en el enlace "¿Olvidaste tu contraseña?" y sigue las instrucciones para restablecerla.<br/><br/>

        <b>3. ¿Qué hago si mi correo electrónico tiene un error tipográfico?</b><br/>
        Asegúrate de que la dirección de correo electrónico que ingreses sea correcta, ya que un error tipográfico puede impedir que inicies sesión correctamente.<br/><br/>

        <b>4. ¿Dónde puedo encontrar los Términos y Condiciones?</b><br/>
        Los Términos y Condiciones se encuentran disponibles a través del enlace proporcionado en la página de inicio de sesión. Revisa esta información antes de continuar.<br/><br/>

        <b>5. ¿No tienes cuenta? ¿Cómo puedo registrarme?</b><br/>
        Si no tienes una cuenta, haz clic en el enlace "¿No tienes una cuenta? Crea una" para registrarte y crear una cuenta nueva.<br/><br/>

        <b>Página de Restablecimiento de Contraseña</b><br/>
        <b>1. ¿Cómo puedo restablecer mi contraseña?</b><br/>
        En la página de restablecimiento de contraseña, ingresa tu dirección de correo electrónico asociada a la cuenta. Luego, crea una nueva contraseña segura de al menos 8 caracteres, combinando mayúsculas, minúsculas, números y caracteres especiales. Repite la nueva contraseña en el campo correspondiente y haz clic en el botón "Continuar" para actualizarla.<br/><br/>

        <b>2. ¿Qué debo hacer si mi nueva contraseña no coincide con la confirmación?</b><br/>
        Asegúrate de que las contraseñas ingresadas en ambos campos coincidan exactamente. Si hay un error, el sistema no te permitirá continuar hasta que coincidan.<br/><br/>

        <b>3. ¿Qué sucede después de restablecer mi contraseña?</b><br/>
        Después de actualizar tu contraseña, serás redirigido a la página de inicio de sesión. Ahí podrás iniciar sesión con tu nueva contraseña.<br/><br/>

        <b>4. ¿Qué hago si ya recuerdo mi contraseña?</b><br/>
        Si recuerdas tu contraseña, puedes hacer clic en el enlace "Volver a la página de inicio de sesión" para regresar a la página de inicio de sesión y no continuar con el restablecimiento de la contraseña.<br/><br/>

        <b>5. ¿Es necesario usar caracteres especiales en la nueva contraseña?</b><br/>
        Sí, para mayor seguridad, es recomendable que utilices una combinación de mayúsculas, minúsculas, números y caracteres especiales en tu nueva contraseña.<br/><br/>
      </Typography>
      <br/>
      <h4 style={{ color: '#FF9F1C', fontFamily: 'var(--font-poppins)' }}><b>Guía para Navegar en la Página de Lista de Deseos</b></h4>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Encuentra respuestas a las preguntas más comunes sobre cómo utilizar la página de lista de deseos. Si tienes más dudas, no dudes en contactarnos.<br/><br/>

        <b>General</b><br/>
        <b>1. ¿Qué es esta página?</b><br/>
        Este sitio no es una tienda en línea. Es una plataforma para crear y gestionar una lista de deseos de productos de distintas tiendas. No puedes realizar compras directamente aquí.<br/><br/>

        <b>2. ¿Cómo funciona la lista de deseos?</b><br/>
        Puedes buscar productos, ver sus detalles y añadirlos a tu lista de deseos para tenerlos guardados y organizados.<br/><br/>

        <b>Cabecera</b><br/>
        <b>3. ¿Cómo vuelvo a la página principal?</b><br/>
        Haz clic en el logotipo en la cabecera. Esto te llevará de vuelta a la página de inicio.<br/><br/>

        <b>4. ¿Cómo puedo buscar productos específicos?</b><br/>
        Utiliza la barra de búsqueda en la cabecera. Puedes filtrar los resultados por tienda utilizando el botón "Filtro de tiendas".<br/><br/>

        <b>5. ¿Qué es el botón para escanear códigos de barras?</b><br/>
        Este botón te permite escanear códigos de barras de productos directamente con tu dispositivo. Así puedes acceder rápidamente a los detalles de un producto y añadirlo a tu lista de deseos.<br/><br/>

        <b>6. ¿Qué hace el botón de la lista de deseos?</b><br/>
        El botón de la lista de deseos (icono del carrito de la compra) te permite ver y gestionar los productos que has añadido a tu lista de deseos.<br/><br/>

        <b>7. ¿Cómo inicio sesión o creo una cuenta?</b><br/>
        Haz clic en el botón "Iniciar sesión" en la cabecera. Desde allí, puedes iniciar sesión en tu cuenta existente o registrarte para crear una nueva.<br/><br/>

        <b>Sección de Productos</b><br/>
        <b>8. ¿Qué información puedo encontrar sobre los productos?</b><br/>
        Cada producto incluye una descripción detallada, una imagen de alta calidad y datos nutricionales (si aplica). También puedes consultar la evolución histórica de precios para saber si es buen momento para comprar.<br/><br/>

        <b>9. ¿Cómo añado un producto a mi lista de deseos?</b><br/>
        Haz clic en el botón "Añadir a la lista de deseos" en la página de detalles del producto.<br/><br/>

        <b>10. ¿Qué hace el botón "Comparar"?</b><br/>
        Este botón te permite comparar el producto que estás viendo con otros artículos similares.<br/><br/>

        <b>Pie de Página</b><br/>
        <b>11. ¿Qué son las categorías de alimentos en el pie de página?</b><br/>
        Las categorías de alimentos son enlaces que te llevan a listas de productos relacionados con cada categoría. Esto facilita encontrar artículos específicos para añadir a tu lista de deseos.<br/><br/>

        <b>Información Adicional</b><br/>
        <b>12. ¿Qué son los datos nutricionales?</b><br/>
        Es información detallada sobre el valor nutricional del producto, como calorías, grasas, proteínas, etc. Esta información aparece debajo de la descripción del producto.<br/><br/>

        <b>13. ¿Qué es la evolución histórica de precios?</b><br/>
        Es una gráfica que muestra cómo ha cambiado el precio del producto con el tiempo, ayudándote a decidir si es buen momento para comprarlo en una tienda.<br/><br/>
      </Typography>
      <br/>
      <h4 style={{ color: '#4CAF50', fontFamily: 'var(--font-poppins)' }}><b>Guía para la Sección de Carrito (Lista de Deseos)</b></h4>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Encuentra aquí las respuestas a las preguntas más comunes relacionadas con el carrito en la página de lista de deseos.<br/><br/>

        <b>General</b><br/>
        <b>1. ¿Qué es el carrito en esta página?</b><br/>
        El carrito aquí no es un carrito de compras tradicional. Es una herramienta para gestionar tu lista de deseos. Te permite ver, organizar y actualizar los productos que has guardado, pero no puedes comprar directamente desde esta plataforma.<br/><br/>

        <b>Cabecera</b><br/>
        <b>2. ¿Cómo vuelvo a la página principal?</b><br/>
        Haz clic en el logotipo en la cabecera para regresar a la página de inicio.<br/><br/>

        <b>3. ¿Puedo buscar más productos desde el carrito?</b><br/>
        Sí, utiliza la barra de búsqueda en la cabecera para buscar más productos y añadirlos a tu lista de deseos.<br/><br/>

        <b>4. ¿Cómo inicio sesión desde el carrito?</b><br/>
        Haz clic en el botón "Iniciar sesión" en la cabecera para acceder a tu cuenta o crear una nueva. Esto te permite guardar tu lista de deseos.<br/><br/>

        <b>Carrito de Lista de Deseos</b><br/>
        <b>5. ¿Qué información puedo ver en el carrito?</b><br/>
        En el carrito encontrarás:<br/>
        - Los productos que has añadido, con una imagen y descripción breve.<br/>
        - El precio del producto.<br/>
        - La cantidad que has seleccionado.<br/>
        - La tienda de la cual fue añadido el producto.<br/>
        - El costo total acumulado de los productos en tu lista.<br/><br/>

        <b>6. ¿Cómo cambio la cantidad de un producto?</b><br/>
        Puedes ajustar la cantidad directamente desde el carrito. Busca el campo o los botones de cantidad junto al producto que quieres modificar.<br/><br/>

        <b>7. ¿Cómo elimino un producto de mi lista de deseos?</b><br/>
        Haz clic en el botón de eliminar (generalmente un ícono de basura o "X") junto al producto que deseas quitar de tu lista.<br/><br/>

        <b>8. ¿Puedo ver de qué tienda es cada producto?</b><br/>
        Sí, cada producto muestra claramente la tienda de donde fue añadido. Esto te ayuda a recordar dónde puedes encontrarlo.<br/><br/>

        <b>9. ¿Qué significa el costo total?</b><br/>
        El costo total es la suma de los precios de todos los productos en tu lista de deseos. Es informativo y no implica que puedas realizar una compra directa desde esta página.<br/><br/>

        <b>Información Adicional</b><br/>
        <b>10. ¿Qué pasa si un producto cambia de precio?</b><br/>
        Si el precio de un producto cambia, la plataforma puede actualizar el precio en tu lista de deseos. Consulta regularmente para estar al tanto de los cambios.<br/><br/>

        <b>11. ¿Puedo exportar mi lista de deseos?</b><br/>
        Revisa si hay una opción para exportar o compartir tu lista de deseos en la configuración de tu cuenta o en el pie de página.<br/><br/>

        <b>Problemas y Soporte</b><br/>
        <b>12. ¿Qué hago si no veo un producto que había añadido?</b><br/>
        Verifica si estás usando la misma cuenta con la que guardaste el producto. Si el problema persiste, contacta al soporte técnico.<br/><br/>

        <b>13. ¿Cómo contacto al soporte si tengo un problema?</b><br/>
        Busca el enlace de contacto o soporte técnico en el pie de página de la página.<br/><br/>
      </Typography>
    </div>

  );
}
