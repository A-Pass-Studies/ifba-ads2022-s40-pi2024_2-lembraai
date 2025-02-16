class Usuario {

    #email;
    #senha;

    constructor(email, senha) {
        this.email = email;
        this.senha = senha;
    }

    get email() {
        return this.#email;
    }
}