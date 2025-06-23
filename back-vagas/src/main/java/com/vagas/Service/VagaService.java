package com.vagas.Service;

import com.vagas.model.Vaga;
import com.vagas.repository.VagaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VagaService {

    @Autowired
    private VagaRepository repository;

    public Vaga criar(Vaga vaga) {
        return repository.save(vaga);
    }

    public List<Vaga> listar() {
        return repository.findAll();
    }

    public Optional<Vaga> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Optional<Vaga> atualizar(Long id, Vaga vagaAtualizada) {
        return repository.findById(id).map(v -> {
            vagaAtualizada.setId(id);
            return repository.save(vagaAtualizada);
        });
    }

    public boolean deletar(Long id) {
        return repository.findById(id).map(v -> {
            repository.deleteById(id);
            return true;
        }).orElse(false);
    }
}