// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextResponse } from "next/server";
// Agrega credenciales
const client = new MercadoPagoConfig({
  accessToken: `${process.env.PRODUCTION_ACCESS_TOKEN}`,
});
const preference = new Preference(client);

export async function GET(req) {
  try {
    const response = await preference.create({
      body: {
        items: [
          {
            title: "Vino bla bla bla",
            quantity: 1,
            unit_price: 100,
          }
        ],
      },
    });

    return NextResponse.json({
      preferences: response,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error inesperado al crear la preferencia." },
      { status: 500 }
    );
  }
}
