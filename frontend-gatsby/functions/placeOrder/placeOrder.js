const nodemailer = require('nodemailer');

const generateOrderEmail = ({ order, total }) => `
  <div>
    <h2>Your recent order for ${total}</h2>
    <p>Please, start walking over, we will have your order ready in the next 30 mins</p>
    <ul>
      ${order
        .map(
          ({ thumbnail, name, size, price }) => `<li>
        <img src="${thumbnail}" alt="${name}"/>
        ${size} ${name} - ${price} 
      </li>`
        )
        .join('')}
    </ul>
    <p>Your total is <strong>$${total}</strong> due at pickup!</p>

    <style>
      ul {
        list-style: none;
      }
    </style>
  </div>
  `;

// Create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  // Validate the data coming in is correct
  const requiredFields = ['name', 'email', 'order'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }

  // Send the email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} ${body.email} orders@example.com`,
    subject: 'New Order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
