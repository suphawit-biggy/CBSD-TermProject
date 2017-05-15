package camt.cbsd.repository;

import camt.cbsd.entity.Product;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Dto on 07-Apr-17.
 */
public interface ProductRepository extends CrudRepository<Product,Long> {
    Product findById(Long id);
    List<Product> findByNameIgnoreCaseContainingOrDescriptionIgnoreCaseContaining(String searchText, String searchText1);
}
