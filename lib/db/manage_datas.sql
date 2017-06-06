/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50610
Source Host           : localhost:3306
Source Database       : manage_datas

Target Server Type    : MYSQL
Target Server Version : 50610
File Encoding         : 65001

Date: 2017-06-06 18:00:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `account` varchar(80) NOT NULL,
  `password` varchar(40) NOT NULL,
  `state` int(2) DEFAULT NULL,
  `power` int(2) DEFAULT NULL,
  `insertTime` timestamp NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account` (`account`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'zhou', '18810926299', '1', '111111', '1', '0', '2017-06-05 09:41:57');
INSERT INTO `user` VALUES ('2', 'zhou1', 'uu', '2', '111111', '1', '0', '2017-06-06 11:08:12');
INSERT INTO `user` VALUES ('16', '1', '13333333333', '8', '11111111', '0', '0', '2017-06-06 11:08:19');
