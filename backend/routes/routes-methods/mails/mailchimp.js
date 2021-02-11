


app.post("/signUp/list", (req,res) => {
    const { firstName, lastName, email } = req.body

    if(!firstName || !lastName || !email){
        res.json({alert: "Disculpe necesitamos que complete los datos para continuar"})
        return;
    }

    const options = {
        url: "https://us2.api.mailchimp.com/3.0/lists/"
    }

})