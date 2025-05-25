from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.message import EmailMessage
import os

app = Flask(__name__)
CORS(app)
EMAIL_ADDRESS = "papacocida295@gmail.com"
EMAIL_PASSWORD = "rjxg imuk vnxc wowc"

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.json
    nombre = data.get('nombreCompleto')
    correo = data.get('correo')
    telefono = data.get('telefono')
    tratamiento = data.get('tratamiento')
    fecha = data.get('fecha')
    hora = data.get('hora')
    metodo_pago = data.get('metodoPago')

    msg = EmailMessage()
    msg['Subject'] = 'Confirmación de tu cita dental'
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = correo
    msg.set_content(f'''
Hola {nombre},

Tu cita ha sido registrada con éxito.

🦷 Detalles:
- Teléfono: {telefono}
- Tratamiento: {tratamiento}
- Fecha: {fecha}
- Hora: {hora}
- Método de Pago: {metodo_pago}

Gracias por confiar en nuestro servicio.
''')

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        print(f"✅ Correo enviado exitosamente a {correo}")
        return jsonify({'success': True})
    except Exception as e:
        print(f"❌ Error al enviar correo a {correo}: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    print("🚀 Servidor Flask corriendo en http://localhost:5001")
    app.run(port=5001)
