import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import path from "path";
import cors from "cors";
import Stripe from "stripe";
import bodyParser from "body-parser";

const app = express();
const port = 3001;
// const resolve = path.resolve;

app.use(cors());
app.use(express.json());
app.use(
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    if (req.originalUrl === "/webhook") {
      next();
    } else {
      bodyParser.json()(req, res, next);
    }
  }
);

const stripe = new Stripe(
  "sk_test_51PIrfLRpqezBlhwYKUt3jNFVpuQH47gGwdRn3Wfq89lOtyEerpQ81HyFF8ZJwApctKvcz7VAk7ERdHYMY6jDX95E00ZylWbkm0"
);

interface Item {
  id: string;
  quantity: number;
  price: number;
}

const calculateOrderAmount = (items: Item[]): number => {
  return items.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );
};

app.post(
  "/create-payment-intent",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const {
      currency,
      paymentMethodType,
      paymentMethodOptions,
      items,
    }: {
      currency: string;
      paymentMethodType: string;
      paymentMethodOptions?: object;
      items: { price: number; quantity: number };
    } = req.body;

    console.log("last");
    console.log(items.price);

    let orderAmount = Number(items.price) * 100;
    let params: Stripe.PaymentIntentCreateParams;

    // console.log("called intent");
    params = {
      // payment_method_types:
      //   paymentMethodType === "link" ? ["link", "card"] : [paymentMethodType],
      payment_method: "pm_card_mastercard",
      amount: orderAmount,
      currency: "sek",
    };

    if (paymentMethodOptions) {
      params.payment_method_options = paymentMethodOptions;
    }
    try {
      const paymentIntent: Stripe.PaymentIntent =
        await stripe.paymentIntents.create(params);

      // Send publishable key and PaymentIntent client_secret to client.
      res.send({
        clientSecret: paymentIntent.client_secret,
        nextAction: paymentIntent.next_action,
      });

      // console.log(paymentIntent);
    } catch (e) {
      res.status(400).send({
        // error: {
        //   message: e.message,
        // },
      });
    }
  }
);

app.get("/movies", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../backend/movies.json"));
});

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "ubaldo61@ethereal.email",
      pass: "6NNEjtwWjme8ecAExw",
    },
  });

  const mailOptions = {
    from: email,
    to: "ubaldo61@ethereal.email",
    subject: "ubaldo61@ethereal.email",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "ubaldo61@ethereal.email",
      pass: "6NNEjtwWjme8ecAExw",
    },
  });

  const mailOptions = {
    from: email,
    to: "ubaldo61@ethereal.email",
    subject: "ubaldo61@ethereal.email",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
