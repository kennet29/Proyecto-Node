export const querys = {
   
     getAllCategoria:"SELECT Id_categoria as codigo, Categoria as nombre, Descripcion as descripcion, Estado as estado FROM Categorias",
     getCategoriaById:"SELECT * FROM Categorias WHERE Id_categoria = @Id",
     addNewCategoria:"INSERT INTO Categorias (Categoria, Descripcion, Estado) VALUES (@nombre, @descripcion, @estado)",
     deleteCategoria:"DELETE FROM Categorias WHERE Id_categoria = @codigo",
     updateCategoriaById:"UPDATE Categorias SET Categoria = @nombre, Descripcion = @descripcion, Estado = @estado WHERE Id_categoria = @codigo",



      getAllColor: "SELECT Id_color as codigo, Color as nombre,Descripcion as descripcion  , Estado as estado FROM Colores",
      getColoryId: "SELECT * FROM Colores WHERE Id = @Id",
      addNewColor: "INSERT INTO Colores (Color,Descripcion,Estado) VALUES (@nombre,@descripcion,@estado)",
      deleteColor: "DELETE FROM Colores WHERE Id_color = @codigo",
      getTotalColor: "SELECT COUNT(*) FROM Colores",
      updateColorById: "UPDATE Colores SET Color = @nombre ,Descripcion=@descripcion, Estado = @estado   WHERE Id_color = @codigo",
      
      getAllDiseños: "SELECT Id_diseño as codigo, Diseño as nombre, Descripcion as descripcion, Estado as estado FROM Diseño",
      getDiseñosById: "SELECT * FROM Diseño WHERE Id_diseño = @Id",
      addNewDiseños: "INSERT INTO Diseño (Diseño, Descripcion, Estado) VALUES (@nombre, @descripcion, @estado)",
      deleteDiseños: "DELETE FROM Diseño WHERE Id_diseño = @codigo",
      getTotalDiseños: "SELECT COUNT(*) FROM Diseño",
      updateDiseñosById: "UPDATE Diseño SET Diseño = @nombre, Descripcion = @descripcion,Estado=@estado WHERE Id_diseño = @codigo",


      getAllEstilos: "SELECT Id_estilos as codigo, Estilo as nombre, Descripcion as descripcion, Estado as estado FROM Estilos",
      getEstilosById: "SELECT * FROM Estilos WHERE Id_estilos = @Id",
      addNewEstilos: "INSERT INTO Estilos (Estilo, Descripcion, Estado) VALUES (@nombre, @descripcion, @estado)",
      deleteEstilos: "DELETE FROM Estilos WHERE Id_estilos = @Id",
      getTotalEstilos: "SELECT COUNT(*) FROM Estilos",
      updateEstilosById: "UPDATE Estilos SET Estilo = @nombre, Descripcion = @descripcion, Estado = @estado WHERE Id_estilos = @codigo",


      getAllMarcas: "SELECT Id_marca as codigo, Marca as nombre, Descripcion as descripcion, Estado as estado FROM Marcas",
      getMarcasById: "SELECT * FROM Marcas WHERE Id_marca = @Id",
      addNewMarcas: "INSERT INTO Marcas (Marca, Descripcion, Estado) VALUES (@nombre, @descripcion, @estado)",
      deleteMarcas: "DELETE FROM Marcas WHERE Id_marca = @codigo",
      getTotalMarcas: "SELECT COUNT(*) FROM Marcas",
      updateMarcasById: "UPDATE Marcas SET Marca = @nombre, Descripcion = @descripcion,Estado = @estado WHERE Id_marca = @codigo",


      getAllMateriales: "SELECT Id_material as codigo, Material as nombre, Descripcion as descripcion, Estado as estado FROM Materiales",
      getMaterialesById: "SELECT * FROM Materiales WHERE Id_material = @Id",
      addNewMateriales: "INSERT INTO Materiales (Material, Descripcion, Estado) VALUES (@nombre, @descripcion, @estado)",
      deleteMateriales: "DELETE FROM Materiales WHERE Id_material = @codigo",
      getTotalMateriales: "SELECT COUNT(*) FROM Materiales",
      updateMaterialesById: "UPDATE Materiales SET Material = @nombre, Descripcion = @descripcion,Estado = @estado WHERE Id_material = @codigo",

      getAllPromociones: "SELECT Id_promocion as codigo, Promocion as nombre, Fecha_inicio as fechaInicio, Fecha_final as fechaFinal, Descuento as descuento, Descripcion as descripcion, Estado as estado FROM Promociones",
      addNewPromociones: "INSERT INTO Promociones (Promocion, Fecha_inicio, Fecha_final, Descuento, Descripcion, Estado) VALUES (@nombre, @fechaInicio, @fechaFinal, @descuento, @descripcion, @estado)",
      deletePromociones: "DELETE FROM Promociones WHERE Id_promocion = @codigo",
      updatePromocionesById: "UPDATE Promociones SET Promocion = @nombre, Fecha_inicio = @fechaInicio, Fecha_final = @fechaFinal, Descuento = @descuento, Descripcion = @descripcion,Estado = @estado WHERE Id_promocion = @codigo",

      getAllProveedores: "SELECT Id_proveedor as codigo, Nombre as nombre, Dirreccion as direccion, Telefono as telefono, Correo as correo, Descripcion as descripcion, Estado as estado FROM Proveedores",
      getProveedoresById: "SELECT * FROM Proveedores WHERE Id_proveedor = @Id",
      addNewProveedores: "INSERT INTO Proveedores (Nombre, Dirreccion, Telefono, Correo, Descripcion, Estado) VALUES (@nombre, @direccion, @telefono, @correo, @descripcion, @estado)",
      deleteProveedores: "DELETE FROM Proveedores WHERE Id_proveedor = @codigo",
      getTotalProveedores: "SELECT COUNT(*) FROM Proveedores",
      updateProveedoresById: "UPDATE Proveedores SET Nombre = @nombre, Dirreccion = @direccion, Telefono = @telefono, Correo = @correo, Descripcion = @descripcion WHERE Id_proveedor = @codigo",


      getAllTallas: "SELECT Id_talla as codigo, Talla as talla, Descripcion as descripcion, Estado as estado FROM Tallas",
      getTallasById: "SELECT * FROM Tallas WHERE Id_talla = @Id",
      addNewTallas: "INSERT INTO Tallas (Talla, Descripcion, Estado) VALUES (@nombre, @descripcion, @estado)",
      deleteTallas: "DELETE FROM Tallas WHERE Id_talla = @codigo",
      getTotalTallas: "SELECT COUNT(*) FROM Tallas",
      updateTallasById: "UPDATE Tallas SET Talla = @nombre, Descripcion = @descripcion,Estado = @estado WHERE Id_talla = @codigo",


      getAllUsers: "SELECT Id_usuario as id, Nombre as nombre, Correo as correo, Estado as estado FROM Usuarios",
      getUserById: "SELECT * FROM Usuarios WHERE Id_usuario = @Id",
      addNewUser: "INSERT INTO Usuarios (Nombre, Correo, Contraseña, Telefono, Estado) VALUES (@nombre, @correo, @contrasena, @telefono, @estado)",
      deleteUser: "DELETE FROM Usuarios WHERE Id_usuario = @Id",
      getTotalUsers: "SELECT COUNT(*) FROM Usuarios",
      updateUserById: "UPDATE Usuarios SET Nombre = @nombre, Correo = @correo, Contraseña = @contrasena, Telefono = @telefono, Estado = @estado WHERE Id_usuario = @id",

      getUserByCredentials:" SELECT Id_usuario, Correo FROM Usuarios WHERE Correo = @correo AND Contraseña = @contraseña;",

      getAllBodega:"SELECT Id_bodega as codigo, Nombre_bodega as nombre, Descripcion as descripcion, Estado as estado FROM Bodega",
      addNewBodega:"INSERT INTO Bodega (Nombre_bodega, Descripcion, Estado) VALUES (@nombre, @descripcion, @estado)",
      deleteBodega:"DELETE FROM Bodega WHERE Id_bodega = @codigo",
      updateBodegaById:"UPDATE Bodega SET Nombre_bodega = @nombre, Descripcion = @descripcion, Estado = @estado WHERE Id_bodega = @codigo",

      UpdateConfig:"UPDATE Configuracion SET Dirreccion = @direccion,Correo_electronico = @correoElectronico,telefono_1 = @telefono1,telefono_2 = @telefono2,Eslogan = @eslogan,tipo_de_cambio = @tipoDeCambio WHERE Id = 1",
      getConfiguracion:" SELECT Id AS codigo,Nombre_negocio AS nombreNegocio, Dirreccion AS direccion, Correo_electronico AS correoElectronico, telefono_1 AS telefono1, telefono_2 AS telefono2, Eslogan AS eslogan, tipo_de_cambio AS tipoDeCambio FROM Configuracion;",

      getAllArticulos:"SELECT A.Id_articulo AS codigo, C.Id_categoria, C.Categoria AS nombre_categoria, A.Nombre, A.Descripcion, A.Estado, P.Id_promocion, P.Promocion AS nombre_promocion FROM Articulos A INNER JOIN Categorias C ON A.Id_categoria = C.Id_categoria INNER JOIN Promociones P ON A.Id_promocion = P.Id_promocion;",
      addNewArticulo:"INSERT INTO Articulos (Id_categoria, Nombre, Descripcion, Estado, Id_promocion) VALUES (@id_categoria, @nombre, @descripcion, @estado, @id_promocion);",
      deleteArticulo:"DELETE FROM Articulos WHERE Id_articulo = @codigo",
      updateArticuloById:"UPDATE Articulos SET Id_categoria = @id_categoria, Nombre = @nombre, Descripcion = @descripcion, Estado = @estado, Id_promocion = @id_promocion WHERE Id_articulo = @codigo",
      completar_promo_articulo:" SELECT Id_promocion, Promocion FROM Promociones;",
      completar_cat_articulo:" SELECT Id_categoria, Categoria FROM Categorias;",
}
  
