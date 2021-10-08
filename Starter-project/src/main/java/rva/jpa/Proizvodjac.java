package rva.jpa;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;


@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@NamedQuery(name="Proizvodjac.findAll", query="SELECT d FROM Proizvodjac d")
public class Proizvodjac implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="PROIZVODJAC_ID_GENERATOR", sequenceName="PROIZVODJAC_SEQ")
	@SequenceGenerator(name="PROIZVODJAC_ID_GENERATOR", sequenceName="PROIZVODJAC_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="PROIZVODJAC_ID_GENERATOR")
	private Integer id;

	private String adresa;

	private String kontakt;

	private String naziv;


	@OneToMany(mappedBy="proizvodjac", cascade = {CascadeType.DETACH, CascadeType.REMOVE})
	@JsonIgnore
	private List<Proizvod> proizvod;

	public Proizvodjac() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAdresa() {
		return this.adresa;
	}

	public void setAdresa(String adresa) {
		this.adresa = adresa;
	}

	public String getKontakt() {
		return this.kontakt;
	}

	public void setKontakt(String kontakt) {
		this.kontakt = kontakt;
	}

	public String getNaziv() {
		return this.naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public List<Proizvod> getProizvod() {
		return this.proizvod;
	}

	public void setProizvod(List<Proizvod> proizvod) {
		this.proizvod = proizvod;
	}

	public Proizvod addProizvod(Proizvod proizvod) {
		getProizvod().add(proizvod);
		proizvod.setProizvodjac(this);

		return proizvod;
	}

	public Proizvod removeProizvod(Proizvod proizvod) {
		getProizvod().remove(proizvod);
		proizvod.setProizvodjac(null);

		return proizvod;
	}

} 
