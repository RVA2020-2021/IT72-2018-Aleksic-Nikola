package rva.jpa;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.math.BigDecimal;


/**
 * The persistent class for the stavka_Racuna database table.
 * 
 */
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name="stavka_racuna")
@NamedQuery(name="StavkaRacuna.findAll", query="SELECT s FROM StavkaRacuna s")
public class StavkaRacuna implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="STAVKA_RACUNA_ID_GENERATOR", sequenceName="STAVKA_RACUNA_SEQ")
	@SequenceGenerator(name="STAVKA_RACUNA_ID_GENERATOR", sequenceName="STAVKA_RACUNA_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="STAVKA_RACUNA_ID_GENERATOR")
	private Integer id;

	private BigDecimal cena;

	@Column(name="jedinica_mere")
	private String jedinicaMere;

	private BigDecimal kolicina;

	@Column(name="redni_broj")
	private Integer redniBroj;

	@ManyToOne
	@JoinColumn(name="racun")
	private Racun racun;

	@ManyToOne
	@JoinColumn(name="proizvod")
	private Proizvod proizvod;

	public StavkaRacuna() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public BigDecimal getCena() {
		return this.cena;
	}

	public void setCena(BigDecimal cena) {
		this.cena = cena;
	}

	public String getJedinicaMere() {
		return this.jedinicaMere;
	}

	public void setJedinicaMere(String jedinicaMere) {
		this.jedinicaMere = jedinicaMere;
	}

	public BigDecimal getKolicina() {
		return this.kolicina;
	}

	public void setKolicina(BigDecimal kolicina) {
		this.kolicina = kolicina;
	}

	public Integer getRedniBroj() {
		return this.redniBroj;
	}

	public void setRedniBroj(Integer redniBroj) {
		this.redniBroj = redniBroj;
	}

	public Racun getRacun() {
		return this.racun;
	}

	public void setRacun(Racun racun) {
		this.racun = racun;
	}

	public Proizvod getProizvod() {
		return this.proizvod;
	}

	public void setProizvod(Proizvod proizvod) {
		this.proizvod = proizvod;
	}

} 
