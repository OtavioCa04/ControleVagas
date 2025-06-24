package com.vagas;

import com.vagas.model.Vaga;
import com.vagas.repository.VagaRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class VagaRepositoryTest {

    @Autowired
    private VagaRepository vagaRepository;

    @Test
    public void testSalvarEBuscarVaga() {
        Vaga vaga = new Vaga();
        vaga.setEmpresa("Empresa Teste");
        vaga.setCargo("Dev Java");
        vaga.setSalario(3500.0);
        vaga.setDescricao("Descrição de teste");
        vaga.setStatus("Aberta");
        vaga.setDataCandidatura(LocalDate.now());

        Vaga vagaSalva = vagaRepository.save(vaga);

        Optional<Vaga> vagaEncontrada = vagaRepository.findById(vagaSalva.getId());

        assertTrue(vagaEncontrada.isPresent());
        assertEquals("Empresa Teste", vagaEncontrada.get().getEmpresa());
        assertEquals("Dev Java", vagaEncontrada.get().getCargo());
    }

    @Test
    public void testDeletarVaga() {
        Vaga vaga = new Vaga();
        vaga.setEmpresa("Empresa Delete");
        vaga.setCargo("Dev Delete");
        vaga.setSalario(2000.0);
        vaga.setDescricao("Teste delete");
        vaga.setStatus("Aberta");
        vaga.setDataCandidatura(LocalDate.now());

        Vaga vagaSalva = vagaRepository.save(vaga);
        Long id = vagaSalva.getId();

        vagaRepository.deleteById(id);

        Optional<Vaga> vagaDeletada = vagaRepository.findById(id);

        assertFalse(vagaDeletada.isPresent());
    }
}
