package rva.repositories;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import rva.jpa.Racun;
import rva.jpa.StavkaRacuna;

public interface StavkaRacunaRepository extends JpaRepository<StavkaRacuna, Integer>{
	
	Collection<StavkaRacuna> findByRacun(Racun racun);

	@Query(value = "select coalesce(max(redni_broj)+1, 1) from stavka_racuna where proizvod = ?1", nativeQuery = true)
	Integer nextRBr(Integer proizvodId);

}