package com.example.demo.controller;

import com.example.demo.model.Aluno;
import com.example.demo.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173"}) // URL do frontend
@RestController
@RequestMapping("/api/alunos")
public class EstudanteController {

    @Autowired
    private AlunoRepository alunoRepo;

    @GetMapping
    public List<Aluno> obterAlunos() {
        return alunoRepo.findAll();
    }

    @PostMapping
    public Aluno adicionarAluno(@RequestBody Aluno novoAluno) {
        return alunoRepo.save(novoAluno);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removerAluno(@PathVariable Long id) {
        if (alunoRepo.existsById(id)) {
            alunoRepo.deleteById(id);
            return ResponseEntity.ok("Aluno removido com sucesso");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aluno> editarAluno(@PathVariable Long id, @RequestBody Aluno alunoModificado) {
        if (alunoRepo.existsById(id)) {
            Aluno alunoExistente = alunoRepo.findById(id).orElse(null);
            if (alunoExistente != null) {
                alunoExistente.setNomeCompleto(alunoModificado.getNomeCompleto());
                alunoExistente.setDataNascimento(alunoModificado.getDataNascimento());
                alunoExistente.setNumeroMatricula(alunoModificado.getNumeroMatricula());
                alunoExistente.setEmail(alunoModificado.getEmail());
                alunoExistente.setTelefone(alunoModificado.getTelefone());
                alunoExistente.setEndereco(alunoModificado.getEndereco());
                Aluno alunoAtualizado = alunoRepo.save(alunoExistente);
                return ResponseEntity.ok(alunoAtualizado);
            }
        }
        return ResponseEntity.notFound().build();
    }
}
