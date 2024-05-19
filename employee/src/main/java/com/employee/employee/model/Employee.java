package com.employee.employee.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Employee {
    @Id
    private String maNV;
    private String pass;
    private String tenNV;
    private String soDT;
    private String quyen;
    private String diaChi;
    private String tenChucVu;
    private double mucLuong;

    public Employee() {
    }

    @Override
    public String toString() {
        return "Employee{" +
                "maNV='" + maNV + '\'' +
                ", pass='" + pass + '\'' +
                ", tenNV='" + tenNV + '\'' +
                ", soDT='" + soDT + '\'' +
                ", quyen='" + quyen + '\'' +
                ", diaChi='" + diaChi + '\'' +
                ", tenChucVu='" + tenChucVu + '\'' +
                ", mucLuong=" + mucLuong +
                '}';
    }

    public String getMaNV() {
        return maNV;
    }

    public void setMaNV(String maNV) {
        this.maNV = maNV;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getTenNV() {
        return tenNV;
    }

    public void setTenNV(String tenNV) {
        this.tenNV = tenNV;
    }

    public String getSoDT() {
        return soDT;
    }

    public void setSoDT(String soDT) {
        this.soDT = soDT;
    }

    public String getQuyen() {
        return quyen;
    }

    public void setQuyen(String quyen) {
        this.quyen = quyen;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public String getTenChucVu() {
        return tenChucVu;
    }

    public void setTenChucVu(String tenChucVu) {
        this.tenChucVu = tenChucVu;
    }

    public double getMucLuong() {
        return mucLuong;
    }

    public void setMucLuong(double mucLuong) {
        this.mucLuong = mucLuong;
    }

    public Employee(String maNV, String pass, String tenNV, String soDT, String quyen, String diaChi, String tenChucVu, double mucLuong) {
        this.maNV = maNV;
        this.pass = pass;
        this.tenNV = tenNV;
        this.soDT = soDT;
        this.quyen = quyen;
        this.diaChi = diaChi;
        this.tenChucVu = tenChucVu;
        this.mucLuong = mucLuong;
    }
}
