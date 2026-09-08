import { Suprimento } from "@/models/Suprimento/Suprimento";
import { SuprimentoRepository } from "@/repositories/SuprimentoRepository/SuprimentoRepository";

export class SuprimentoService{

    private suprimentoRepository: SuprimentoRepository;

    constructor(){
        this.suprimentoRepository = new SuprimentoRepository();
    }

     public async listarSuprimento(){

        this.suprimentoRepository.listar();
    }



    public async buscarSuprimentoPorid(id_suprimento: number){

        this.suprimentoRepository.buscarPorId(id_suprimento);
    }


   

    public async cadastrarSuprimento(dados: {nome: string, unidade: string, quantidade_estoque: number, quantidade_minima: number}){

        const novoSuprimento = new Suprimento(0, dados.nome, dados.unidade, dados.quantidade_estoque, dados.quantidade_minima, new Date())

        await this.suprimentoRepository.salvar(novoSuprimento);
    }


    public async atualizarSuprimento(id_suprimento: number, dados: {nome: string, unidade: string, quantidade_estoque: number, quantidade_minima: number, ativo: boolean}){

        const suprimento = await this.suprimentoRepository.buscarPorId(id_suprimento);

        if(!suprimento){
            console.log("Suprimento não encontrado no estoque!")
        } else {
            suprimento.nome = dados.nome;
            suprimento.unidade = dados.unidade;
            suprimento.quantidade_minima = dados.quantidade_minima;
            suprimento.ativo = dados.ativo;

        }

        await this.suprimentoRepository.atualizar(suprimento!);
    }
}