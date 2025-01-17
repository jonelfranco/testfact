USE [TEST]
GO

-- TABLA BODEGA
INSERT INTO [dbo].[BODEGA] (CODIGO, NOMBRE) VALUES (1, 'BODEGA 1')
INSERT INTO [dbo].[BODEGA] (CODIGO, NOMBRE) VALUES (2, 'BODEGA 2')
INSERT INTO [dbo].[BODEGA] (CODIGO, NOMBRE) VALUES (3, 'BODEGA 3')

-- TABLA SUCURSAL
INSERT INTO [dbo].[SUCURSAL] (CODIGO, NOMBRE, CODIGO_BODEGA) VALUES (1, 'SUCURSAL 1 - BODEGA 1', 1)
INSERT INTO [dbo].[SUCURSAL] (CODIGO, NOMBRE, CODIGO_BODEGA) VALUES (2, 'SUCURSAL 2 - BODEGA 1', 1)
INSERT INTO [dbo].[SUCURSAL] (CODIGO, NOMBRE, CODIGO_BODEGA) VALUES (3, 'SUCURSAL 3 - BODEGA 2', 2)
INSERT INTO [dbo].[SUCURSAL] (CODIGO, NOMBRE, CODIGO_BODEGA) VALUES (4, 'SUCURSAL 4 - BODEGA 2', 2)
INSERT INTO [dbo].[SUCURSAL] (CODIGO, NOMBRE, CODIGO_BODEGA) VALUES (5, 'SUCURSAL 5 - BODEGA 3', 3)
INSERT INTO [dbo].[SUCURSAL] (CODIGO, NOMBRE, CODIGO_BODEGA) VALUES (6, 'SUCURSAL 6 - BODEGA 3', 3)

-- TABLA MONEDA
INSERT INTO [dbo].[MONEDA] (CODIGO, NOMBRE) VALUES ('USD', 'DOLARES')
INSERT INTO [dbo].[MONEDA] (CODIGO, NOMBRE) VALUES ('PEN', 'SOLES')