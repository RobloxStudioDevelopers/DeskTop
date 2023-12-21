import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class CustomsCarCalculatorApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomsCarCalculatorApplication.class, args);
    }
}

@RestController
class CustomsCalculatorController {

    @PostMapping("/calculate")
    public ResponseEntity<CalculationResult> calculate(@RequestBody CalculationRequest request) {
        double customsDuty = request.getCarValue() * CustomsCalculator.calculateCustomsDutyRate(request.getCarType());
        double excise = CustomsCalculator.calculateExcise(request.getEngineType(), request.getEngineVolume(), request.getCarYear());
        double vat = (request.getCarValue() + customsDuty + excise) * CustomsCalculator.VAT_RATE;

        CalculationResult result = new CalculationResult(customsDuty, excise, vat);
        return ResponseEntity.ok(result);
    }
}

class CustomsCalculator {
    public static final double VAT_RATE = 0.2; // Пример ставки НДС
    
    public static double calculateCustomsDutyRate(int carType) {
        // Здесь должна быть логика для определения ставки таможенной пошлины в зависимости от типа автомобиля
        return 0.1; // Пример ставки
    }

    public static double calculateExcise(int engineType, int engineVolume, int carYear) {
        // Здесь должна быть логика для расчета акциза
        return engineVolume * 50; // Пример расчета
    }
}

class CalculationRequest {
    private int carType;
    private int engineType;
    private int engineVolume;
    private int carYear;
    private double carValue;

    // Конструкторы, геттеры и сеттеры
    // ...

    // Допустим, у нас есть геттеры для всех полей
    public int getCarType() { return carType; }
    public int getEngineType() { return engineType; }
    public int getEngineVolume() { return engineVolume; }
    public int getCarYear() { return carYear; }
    public double getCarValue() { return carValue; }
}

class CalculationResult {
    private double customsDuty;
    private double excise;
    private double vat;

    // Конструктор
    public CalculationResult(double customsDuty, double excise, double vat) {
        this.customsDuty = customsDuty;
        this.excise = excise;
        this.vat = vat;
    }

    // Геттеры
    public double getCustomsDuty() { return customsDuty; }
    public double getExcise() { return excise; }
    public double getVat() { return vat; }
}
