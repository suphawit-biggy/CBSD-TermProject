package camt.cbsd.controller;

import camt.cbsd.config.json.View;
import camt.cbsd.entity.Product;
import camt.cbsd.entity.RegisterEntity;
import camt.cbsd.services.ProductService;
import com.fasterxml.jackson.annotation.JsonView;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalTime;
import java.util.List;

@RestController
@ConfigurationProperties(prefix = "server")
public class ProductController {
    ProductService productService;
    String imageServerDir;
    String imageUrl;
    String baseUrl;

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setImageServerDir(String imageServerDir) {
        this.imageServerDir = imageServerDir;
    }

    @Autowired
    public void setProductService(ProductService productService) {
        this.productService = productService;
    }


    @GetMapping("/product")
    public List<Product> getProducts() {

        List<Product> products = productService.getProducts();
        return products;
    }


    @GetMapping("/product/{id}")
    public ResponseEntity<?> getProduct(@PathVariable("id") long id) {
        Product product = productService.findById(id);
        if (product != null)
            return ResponseEntity.ok(product);
        else
            //http code 204
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

    }

    @GetMapping("/products")
    public ResponseEntity<?> queryProduct(HttpServletRequest request, @RequestParam("search") String query) {
        List<Product> products = productService.queryProduct(query);
        if (products != null)
            return ResponseEntity.ok(products);
        else
            //http code 204
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

    }

    @PostMapping("/product")
    public Product uploadOnlyProduct(@RequestBody Product product) {

        productService.addProduct(product);
        return product;

    }


    @PostMapping("/product/image")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        try {
            BufferedImage img = ImageIO.read(file.getInputStream());
            String oldFilename = file.getOriginalFilename();
            String ext = FilenameUtils.getExtension(oldFilename);
            String newFilename = Integer.toString(LocalTime.now().hashCode(), 16) + Integer.toString(oldFilename.hashCode(), 16) + "." + ext;
            File targetFile = Files.createFile(Paths.get(imageServerDir + newFilename)).toFile();
            ImageIO.write(img, ext, targetFile);

            return ResponseEntity.ok(baseUrl + imageUrl + newFilename);

        } catch (NullPointerException e) {
            return ResponseEntity.status(202).build();
        }
    }


    @GetMapping("/product/images/{fileName:.+}")
    public ResponseEntity<?> getStuentImage(@PathVariable("fileName") String filename) {
        Path pathFile = Paths.get(imageServerDir + filename);

        try {
            Resource resource = new UrlResource(pathFile.toUri());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @JsonView(View.Login.class)
    @PostMapping("/productAuthen")
    public Product uploadProductAuthen(@RequestBody RegisterEntity user) {

        Product product = productService.addProduct(user);
        return product;
    }
}
