import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    Req,
    Res
} from "@nestjs/common";

import {isNumeric} from "rxjs/internal-compatibility";

//http://localhost:3001/calculadora
@Controller('calculadora')
export class CalculadoraController {

    @Get('suma/:numero')
    @HttpCode(200)
    suma(@Param() parametrosRuta,@Query() parametrosConsulta, @Req() req,@Res() res){
        let mensaje = {}

        if(req.cookies.user){
            const numero1 = parametrosRuta.numero
            const numero2 = parametrosConsulta.numero

            if(numero1 && numero2){

                if(isNumeric(numero1) && isNumeric(numero2)){

                    const resultadoOperacion = Number(numero1) + Number(numero2)
                    const puntosActuales = Number(req.signedCookies.puntos)
                    const puntosFinal = this.reduccionPuntos(puntosActuales, resultadoOperacion)


                    if(puntosFinal <= 0){
                        res.cookie('puntos',100,{signed:true})
                        mensaje = {
                            usuario:req.cookies.user,
                            resultado: resultadoOperacion,
                            mensaje:"haz terminado tus puntos, se te han restablecido de nuevo",
                        }

                    }else{

                        res.cookie('puntos',puntosFinal,{signed:true})
                        mensaje = {
                            usuario:req.cookies.user,
                            mensaje:"Resultados Suma",
                            numero1:Number(numero1),
                            numero2:Number(numero2),
                            resultado: resultadoOperacion
                        }
                    }
                    res.send(mensaje)
                }else{
                    throw new BadRequestException('Error, no son numeros');
                }

            }else{
                throw new BadRequestException('Error, debe ingresar 2 numeros');
            }
        }else{
            throw new BadRequestException('Error, usuario no definido');

        }
    }


    @Put('resta')
    @HttpCode(201)
    restar(@Body() parametrosBody,@Headers() headers, @Req() req, @Res() res){

        let mensaje={}
        if(req.cookies.user){
            const numero1 = parametrosBody.numero
            const numero2 = headers.numero

            if(numero1 && numero2){

                if(isNumeric(numero1) && isNumeric(numero2)){

                    const resultadoOperacion:number = Number(numero1) - Number(numero2)

                    const puntosActuales = Number(req.signedCookies.puntos)
                    const puntosFinal = this.reduccionPuntos(puntosActuales, resultadoOperacion)

                    if(puntosFinal <= 0){

                        mensaje = {
                            usuario:req.cookies.user,
                            resultado: resultadoOperacion,
                            mensaje:"haz terminado tus puntos, se te han restablecido de nuevo",
                        }
                        res.cookie('puntos',100,{signed:true})

                    }else{

                        res.cookie('puntos',puntosFinal,{signed:true})
                        mensaje = {
                            usuario:req.cookies.user,
                            mensaje:"Resultado Resta",
                            numero1:Number(numero1),
                            numero2:Number(numero2),
                            resultado: resultadoOperacion,
                        }
                    }

                res.send(mensaje)
                }else{
                    throw  new BadRequestException('Error, no son numeros')
                }

            }else{
                throw new BadRequestException('Error, debe ingresar 2 numeros');
            }
        }else{
            throw  new BadRequestException('Error, usuario no definido')
        }

    }

    @Delete('multiplicacion/:numero')
    @HttpCode(200)
    multiplicacion(@Headers() headers, @Param() parametrosRuta, @Req() req,@Res() res){
        let mensaje = {}

        if(req.cookies.user){

            const numero1 = headers.numero
            const numero2 = parametrosRuta.numero

            if(numero1 && numero2){
                if(isNumeric(numero1) && isNumeric(numero2)){

                    const resultadoOperacion:number = Number(numero1) * Number(numero2)

                    const puntosActuales = Number(req.signedCookies.puntos)
                    const puntosFinal = this.reduccionPuntos(puntosActuales, resultadoOperacion)

                    if(puntosFinal <= 0){

                        mensaje = {
                            usuario:req.cookies.user,
                            resultado: resultadoOperacion,
                            mensaje:"haz terminado tus puntos, se te han restablecido de nuevo",
                        }
                        res.cookie('puntos',100,{signed:true})

                    }else{

                        res.cookie('puntos',puntosFinal,{signed:true})
                        mensaje = {
                            usuario:req.cookies.user,
                            mensaje:"Resultado Multiplicacion",
                            numero1:Number(numero1),
                            numero2:Number(numero2),
                            resultado: resultadoOperacion
                        }
                    }
                    res.send(mensaje)
                }else{
                    throw  new BadRequestException('Error, no son numeros')
                }

            }else{
                throw new BadRequestException('Error, debe ingresar 2 numeros');
            }

        }else{
            throw  new BadRequestException('Error, usuario no definido')
        }
    }


    @Post('division/:numero1/:numero2')
    @HttpCode(201)
    division(@Param() parametrosRuta, @Req() req, @Res() res){

        let mensaje = {}

        if(req.cookies.user){
            const numero1 = parametrosRuta.numero1
            const numero2 = parametrosRuta.numero2

            if(isNumeric(numero1) && isNumeric(numero2)){

                if(Number(numero2) == 0){
                    throw  new BadRequestException('Error, el numero2 no debe ser cero')
                }else{

                    const resultadoOperacion:number = Number(numero1)/Number(numero2)
                    const puntosActuales = Number(req.signedCookies.puntos)
                    const puntosFinal = this.reduccionPuntos(puntosActuales, resultadoOperacion)

                    if(puntosFinal <= 0){

                        mensaje = {
                            usuario:req.cookies.user,
                            resultado: resultadoOperacion,
                            mensaje:"haz terminado tus puntos, se te han restablecido de nuevo",
                        }
                        res.cookie('puntos',100,{signed:true})

                    }else{
                        res.cookie('puntos',puntosFinal,{signed:true})
                        mensaje = {
                            usuario:req.cookies.user,
                            mensaje:"Resultado Division",
                            numero1:Number(numero1),
                            numero2:Number(numero2),
                            resultado: resultadoOperacion,
                        }
                    }

                    res.send(mensaje)
                }
            }else{
                throw  new BadRequestException('Error, no son numeros')
            }

        }else{
            throw  new BadRequestException('Error, usuario no definido')
        }
    }


    @Get('guardar')
    guardarCookie(@Query() nombreUsuarioConsulta,
                  @Res() res){

        if(nombreUsuarioConsulta.usuario){

            const puntos:number = 100;
            res.cookie('user',nombreUsuarioConsulta.usuario)
            res.cookie('puntos',puntos,{signed:true})

            res.send(
                {
                    mensaje:'usuario agregado',
                    user:nombreUsuarioConsulta.usuario,
                    points:puntos
                })
        }else{
            res.send({mensaje:"Error, usuario no agregado"})
        }
    }

    // reduccionPuntos(resultadoOperacion: number,@Req() req,@Res() res):number{
    //
    //
    //     const puntosActuales = Number(req.signedCookies.puntos)
    //     const valorFinalPuntos = puntosActuales - Math.abs(resultadoOperacion);
    //
    //
    //     if(valorFinalPuntos <= 0){
    //         const advertencia = {
    //             advertencia:req.cookies.user + " haz terminado tus puntos. Espere",
    //             mensaje:"se te han restablecido los puntos Continua"
    //         }
    //         res.cookie('puntos',100,{signed:true})
    //         res.send(advertencia)
    //
    //     }else{
    //         res.cookie('puntos',valorFinalPuntos,{signed:true})
    //     }
    //
    //     return  valorFinalPuntos;
    // }

    reduccionPuntos(puntosActuales:number,resultadoOperacion: number):number{
         return puntosActuales - Math.abs(resultadoOperacion);
    }

}
