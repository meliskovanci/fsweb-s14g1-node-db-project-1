-- Veritabanı Sorguları

-- Posta kodu 1010 olan tüm müşterileri bulun
   SELECT * FROM Customers WHERE PostalCode = 1010;

-- id'si 11 olan tedarikçinin telefon numarasını bulun
  SELECT Phone FROM Suppliers WHERE SupplierID = 11;

-- Verilen ilk 10 siparişi, sipariş tarihine göre azalan şekilde listeleyin
   SELECT * FROM Orders Order By orderdate desc limit 10;

-- Londra, Madrid veya Brezilya'da yaşayan tüm müşterileri bulun
SELECT * FROM Customers WHERE City='London' OR City='Madrid' OR Country='Brazil';

-- "The Shire" için bir müşteri kaydı ekleyin, ilgili kişi adı "Bilbo Baggins", adres - "Bag End" içinde "1 Hobbit-Hole", posta kodu "111" ve ülke "Middle Earth"
INSERT into Customers (CustomerName, ContactName, Address, City, PostalCode, Country) values ('The Shire', 'Bilbo Baggins', '1 Hobbit-Hole', 'Bag End', '111', 'Middle Earth');

-- Posta kodu "11122" olarak değişecek şekilde Bilbo Baggins kaydını güncelleyin
UPDATE Customers set PostalCode = '11122' WHERE ContactName = 'Bilbo Baggins';

-- (Zorlayıcı Görev) Müşteriler tablosunda kaç farklı şehrin saklandığını keşfetmek için bir sorgu bulun. Tekrarlar çift sayılmamalıdır

select distinct city from customers

-- (Zorlayıcı Görev) 20 karakterden uzun adları olan tüm tedarikçileri bulun. Adın uzunluğunu almak için "length(SupplierName)" kullanabilirsiniz.

SELECT *, length(SupplierName) FROM [Suppliers] where length(SupplierName) > 20