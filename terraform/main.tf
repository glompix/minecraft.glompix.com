terraform {
  required_version = ">= 0.12"
}

provider "aws" {
}

resource "aws_vpc" "main" {
  cidr_block            = "10.0.0.0/16"
  enable_dns_hostnames  = true
  enable_dns_support    = true

  tags = {
    Name = "MinecraftVPC"
  }
}

resource "aws_subnet" "main" {
  vpc_id     = "${aws_vpc.main.id}"
  cidr_block = "10.0.1.0/24"

  tags = {
    Name = "MinecraftSubnet"
  }
}

module "minecraft" {
  source = "git@github.com:glompix/terraform-aws-minecraft.git?ref=master"

  key_name      = "MinecraftKeyPair"
  bucket_id     = "minecraft-glompix"
  mc_version    = "1.14"
  instance_type = "t2.small"
  vpc_id        = "${aws_vpc.main.id}"
  subnet_id     = "${aws_subnet.main.id}"
}
