package camt.cbsd.dao;

import camt.cbsd.entity.Product;

import java.util.List;

/**
 * Created by Dto on 3/15/2017.
 */
public interface ProductDao {
    List<Product> getProducts();
    Product findById(long id);
    Product addProduct(Product product);
    Integer size();
    Product findByUsername(String username);
    List<Product> getProducts(String searchText);
}
