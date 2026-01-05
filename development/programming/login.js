//mantenha-se conectado 
//Ao carregar a página. verificamos se o usuario ja acessou o site anteriomente e optou por conectalo

function verificarlogado() {
    if(getcookie("email") != null) {
        // pagina restrita mantenha-nos conectado 
        window.location.href = "restrita.html";
    }
}
// Ao submeter o formulario, verifica-se o preechimento das funções foram conectados no login 
function campospreenchidos() {
    eremail = /^[w!#$%&'*+\/=?^ `{|}~-]+(\.[\w!#$%&'*+\/=?^ `{|}~-]+)*@(([\w-]+\.)+[A-Za-z]{2,6}|\[\d{1,3}(\.\d{1,3}){3}\])$/;
    if(FormData.email.value == " " || !form.email.value.match(eremail)) {
        alert("Preencha o campo do EMAIL corretamente");
        return false;
    }
    // verificar se a senha esta corretamente preenchida
    if (form.senha.value != "Javascript") {
        alert("Preencha o campo SENHA corretamente");
        return false;
    }     
    // manter conectado e selecione a opção 
    if(form.conectado.checked) {
        setCookie("email", form.email.value, 10);
    }
    return true;
}

