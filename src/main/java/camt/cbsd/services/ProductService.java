package camt.cbsd.services;

import camt.cbsd.entity.Product;
import camt.cbsd.entity.RegisterEntity;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;

/**
 * Created by Dto on 3/11/2017.
 */
public interface ProductService {
    List<Product> getProducts();
    Product findById(long id);
    Product addProduct(Product product);
    Product getProductForTransfer(String username);
    Product addProduct(Product product, String imageFileName, BufferedImage image) throws IOException;
    List<Product> queryProduct(String query);
    Product addProduct(RegisterEntity registerEntity);
}
