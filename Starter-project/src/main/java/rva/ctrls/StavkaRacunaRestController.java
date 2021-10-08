package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Proizvod;
import rva.jpa.Racun;
import rva.jpa.StavkaRacuna;
import rva.repositories.RacunRepository;
import rva.repositories.StavkaRacunaRepository;

@CrossOrigin
@RestController
@Api(tags = {"Stavka racuna CRUD operacije"})
public class StavkaRacunaRestController {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private StavkaRacunaRepository stavkaRacunaRepository;
	@Autowired
	private RacunRepository racunRepository;

	@GetMapping("stavkaRacuna")
	@ApiOperation(value = "Vraća kolekciju svih stavki računa iz baze podataka")
	public Collection<StavkaRacuna> getStavkeRacuna() {
		return stavkaRacunaRepository.findAll();
	}

	@GetMapping("stavkaRacuna/{id}")
	@ApiOperation(value = "Vraca stavku racuna prema proslijeđenom id-u iz baze podataka")
	public StavkaRacuna getStavkaRacuna(@PathVariable("id") Integer id) {
		return stavkaRacunaRepository.getOne(id);
	}
	
	@GetMapping("stavkeZaRacun/{id}")
	@ApiOperation(value = "Vraca racun iz stavke racuna prema proslijedjenom id-u iz baze podataka")
	public Collection<StavkaRacuna> stavkePoRacunu(@PathVariable("id") int id){
		Racun r = racunRepository.getOne(id);
		return stavkaRacunaRepository.findByRacun(r);
	}
	
	@PostMapping("stavkaRacuna")
	@ApiOperation(value = "Ubacuje stavku racuna u bazu podataka")
	public ResponseEntity<StavkaRacuna> insertStavkaRacuna(@RequestBody StavkaRacuna stavkaRacuna) {
		if(!stavkaRacunaRepository.existsById(stavkaRacuna.getId())) {
			stavkaRacuna.setRedniBroj(stavkaRacunaRepository.nextRBr(stavkaRacuna.getProizvod().getId()));
			stavkaRacunaRepository.save(stavkaRacuna);
			return new ResponseEntity<StavkaRacuna>(HttpStatus.OK);
		}
		return new ResponseEntity<StavkaRacuna>(HttpStatus.CONFLICT);
	}

	@PutMapping("stavkaRacuna")
	@ApiOperation(value = "Mijenja stavku racuna iz baze podataka")
	public ResponseEntity<StavkaRacuna> updateStavkaRacuna(@RequestBody StavkaRacuna stavkaRacuna) {
		if(!stavkaRacunaRepository.existsById(stavkaRacuna.getId())) {
			return new ResponseEntity<StavkaRacuna>(HttpStatus.NO_CONTENT);
		}
		stavkaRacunaRepository.save(stavkaRacuna);
		return new ResponseEntity<StavkaRacuna>(HttpStatus.OK); 
	}

	@DeleteMapping("stavkaRacuna/{id}")
	@ApiOperation(value = "Brise stavku racuna iz baze podataka")
	public ResponseEntity<StavkaRacuna> deleteStavkaRacuna(@PathVariable("id") Integer id) {
		if(!stavkaRacunaRepository.existsById(id)) {
			return new ResponseEntity<StavkaRacuna>(HttpStatus.NO_CONTENT);
		}
		stavkaRacunaRepository.deleteById(id);
		if(id == -100) {
			jdbcTemplate.execute(
					"INSERT INTO stavka_racuna(\"id\", \"redni_broj\", \"kolicina\", \"jedinica_mere\", \"cena\", \"proizvod\", \"racun\")"
					+ "VALUES(-100, 30, 15, 'kg', 100, -100, -100)"
			);
		}
		return new ResponseEntity<StavkaRacuna>(HttpStatus.OK);
	}

}
