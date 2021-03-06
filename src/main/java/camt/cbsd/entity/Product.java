package camt.cbsd.entity;

import camt.cbsd.config.json.View;
import camt.cbsd.entity.security.Authority;
import camt.cbsd.entity.security.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.*;
import org.hibernate.annotations.*;
import org.hibernate.annotations.CascadeType;

import javax.persistence.*;
import javax.persistence.Entity;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Created by Dto on 3/11/2017.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor(suppressConstructorProperties = true)
@JsonIgnoreProperties(ignoreUnknown = true)
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;
    @JsonView(View.Login.class)
    String name;
    String description;
    @JsonView(View.Login.class)
    String image;
    @JsonView(View.Login.class)
    int amount;
    double rate;
    @JsonView(View.Login.class)
    double price;
}
