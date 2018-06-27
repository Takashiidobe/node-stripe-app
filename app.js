import keys from './keys/keys.json';
//our publishable key
const keyPublishable = keys.keysPublishable;
//our secret key
const keySecret = keys.keySecret;
//we need pug to render this
const pug = require('pug');
const ejs = require('ejs');
//web developer's website

const port = process.env.PORT || 4567;

//instantiate app
const app = require('express')();
//instantiate stripe
const stripe = require('stripe')(keySecret);

//app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.use(require('body-parser').urlencoded({ extended: false }));

//sets the default rendering 
app.get('/', (req, res) => {
  res.render('index.ejs');
});

//this works if we are posting for one id
//three blocks of code to charge per item
app.post('/charge/item/1', (req, res, next) => {
  console.log('Item 1 was bought');
  //these are our amounts to charge
  let amount = 2000;
  
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then((customer) => {
    stripe.charges.create({
      amount, 
      description: 'Sample Charge',
      currency: 'usd',
      customer: customer.id
    })
  })
  .then((charge) => {
    console.log(charge);
    res.render('charge.ejs');
  });
});

app.post('/charge/item/2', (req, res, next) => {
  console.log("Item 2 was bought");

  let amount = 4000;

  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then((customer) => {
    stripe.charges.create({
      amount, 
      description: 'Sample Charge',
      currency: 'usd',
      customer: customer.id
    })
  })
  .then((charge) => {
    console.log(charge);
    res.render('charge.ejs');
  });

})

app.post('/charge/item/3', (req, res, next) => {
  console.log("Item 3 was bought");

  let amount = 6000;

  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then((customer) => {
    stripe.charges.create({
      amount, 
      description: 'Sample Charge',
      currency: 'usd',
      customer: customer.id
    })
  })
  .then((charge) => {
    console.log(charge);
    res.render('charge.ejs');
  });
})


// stripe.coupons.create({
//   percent_off: 26,
//   duration: 'once',
//   id: '26OFF'
// }, (err, coupon) => {
//   console.log(err);
// });

// stripe.coupons.retrieve(
//   "25OFF",
//   (err, coupon) => {
//     //what you want to do with the retrieved coupon
//   }
// );

stripe.invoices.create({
  customer: 'CUSTOMER_ID'
}, (err, invoice) => {
  //something goes here
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});