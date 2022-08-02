const nodemailer = require("nodemailer");

module.exports = (formulario) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dummydiaz95@gmail.com", // Cambialo por tu email
      pass: "lxjxjtxnfjxihhev", // Cambialo por tu password
    },
  });

  const mailOptions = {
    from: `${formulario.nombre} 👻” <${formulario.email}>`,
    to: formulario.email, // Cambia esta parte por el destinatario
    subject: `Envío de cotización`,
    html: `
    <strong>Fecha:</strong> ${new Date()} <br/>
    <strong>Nombre:</strong> ${formulario.name} ${formulario.surename} <br/>
    <strong>E-mail:</strong> ${formulario.email} <br/>
    <strong>Mensaje:</strong> ${formulario.comments}
    `,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};
