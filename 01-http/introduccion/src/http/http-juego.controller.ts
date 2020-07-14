import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Query,
    Req, Res
} from "@nestjs/common";
import {MascotaCreateDto} from "./DTO/mascota.create-dto";
import {validate, ValidationError} from "class-validator";

//http://localhost:3001/juegos-http
@Controller('juegos-http')
export class HttpJuegoController {

    @Get('hola')
    @HttpCode(201)
    hola(){

        /*errores */
        throw new BadRequestException('No envia Nada')


        //return 'Hola GET! :)'
    }

    @Post('hola')
    @HttpCode(202)
    holaPost(){
        return 'Hola POST!'
    }

    @Delete('hola')
    @HttpCode(204)
    @Header('cache-control','none')
    @Header('EPN','probando las cosas')
    holaDelete(){
        return 'hola DELETE!'
    }

    //TRABAJANDO CON PARAMETROS DE RUTA
    //http://localhost:3001/juegos-http/parametros-ruta/XX/gestion/YY
    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplo(@Param() parametrosRuta){
        //obtener parametros de ruta en este framework

        
        if(isNaN(parametrosRuta.edad) && isNaN(parametrosRuta.altura) ){
            throw  new BadRequestException('No es un numero')
        }else{
            console.log('Parametros', parametrosRuta)
            const edad:number = parametrosRuta.edad
            const altura:number = parametrosRuta.altura
            return edad + altura
        }

    }

    //parametros de consulta
    @Get('parametros-consulta')
    parametrosConsulta(@Query() parametrosDeConsulta){
        console.log('ParametrosConsulta', parametrosDeConsulta)

        if(parametrosDeConsulta.nombre && parametrosDeConsulta.apellido ){
            return parametrosDeConsulta.nombre + " " + parametrosDeConsulta.apellido
        }else{
            return "=)"
        }

    }


    //parametros de cuerpo
    @Post('parametros-cuerpo')
    @HttpCode(200)
    async parametrosDeCuerpo(
        @Body() parametrosCuerpo
    ){

        const mascotaValida = new MascotaCreateDto()



        mascotaValida.nombre = parametrosCuerpo.nombre
        mascotaValida.edad = parametrosCuerpo.edad
        mascotaValida.ligada = parametrosCuerpo.ligada
        mascotaValida.casada = parametrosCuerpo.casada
        mascotaValida.peso = parametrosCuerpo.peso

        try{

            const errores: ValidationError[] = await validate(mascotaValida)
            if(errores.length > 0){
                console.error('Errores', errores)
                throw new BadRequestException('Error validando')
            }else{
                const mensajeCorrecto = {
                    mensaje:'se creo correctamente'
                }
                return mensajeCorrecto;
            }


        }catch (e) {
            throw new BadRequestException('Error validando');
        }


        // console.log('parametros de cuerpo', parametrosCuerpo)
        // return 'Registro creado'
    }

    //COOKIES---------------------->
    //1. guardar cookies inseguras
    //2. guardar cookies seguras
    //3. mostrar cookies

    @Get('guardarCookieInsegura')
    guardarCookieInsegura(
        @Query() parametrosConsulta,
        @Req() req, //obtener solicitud
        @Res() res //obtener respuesta
    ){

        res.cookie(
            'galletaInsegura',//nombre de la cookie
            'tengo hambre'//valor de la cookie
        );
        const mensaje = {
            mensaje:'ok'
        }
        res.send(mensaje)
    }







}