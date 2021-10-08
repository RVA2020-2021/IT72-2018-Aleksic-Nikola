package rva.jpa;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;



@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@NamedQuery(name="Racun.findAll", query="SELECT r FROM Racun r")

public class Racun implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="RACUN_ID_GENERATOR", sequenceName="RACUN_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="RACUN_ID_GENERATOR")
	private Integer id;

	private Date datum;

	private String nacinPlacanja;

	@OneToMany(mappedBy="racun", cascade = {CascadeType.DETACH, CascadeType.REMOVE})
	@JsonIgnore
	private List<StavkaRacuna> stavkaRacuna;

	public Racun() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getDatum() {
		return this.datum;
	}

	public void setDatum(Date datum) {
		this.datum = datum;
	}

	public String getNacinPlacanja() {
		return this.nacinPlacanja;
	}

	public void setNacinPlacanja(String nacinPlacanja) {
		this.nacinPlacanja = nacinPlacanja;
	}

	public List<StavkaRacuna> getStavkaRacuna() {
		return this.stavkaRacuna;
	}

	public void setStavkaRacuna(List<StavkaRacuna> stavkaRacunas) {
		this.stavkaRacuna = stavkaRacunas;
	}

	public StavkaRacuna addStavkaRacuna(StavkaRacuna stavkaRacuna) {
		getStavkaRacuna().add(stavkaRacuna);
		stavkaRacuna.setRacun(this);

		return stavkaRacuna;
	}

	public StavkaRacuna removeStavkaRacuna(StavkaRacuna stavkaRacuna) {
		getStavkaRacuna().remove(stavkaRacuna);
		stavkaRacuna.setRacun(null);

		return stavkaRacuna;
	}

} 
