package com.example.demo.model;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

@Entity
@Getter
@Setter
public class Aluno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_aluno;
    private String nomecompleto;
    private String datadenascimento;
    private String numerodaMatricula;
    private String email;
    private String telefone;
    private String endereco;
}
