.. include:: ../../Includes.txt

==============================================
Feature: #90266 - Fluid-based templated emails
==============================================

See :issue:`90266`

Description
===========

TYPO3 now supports sending template-based emails for multi-part and HTML-based
emails out-of-the-box. The email contents are built with Fluid Templating Engine.

TYPO3's backend functionality already ships with a default layout
for templated emails, which can be tested out in TYPO3's install tool test email functionality.

It is also possible to set a default mode for sending out emails via :php:`$GLOBALS['TYPO3_CONF_VARS']['MAIL']['format']` which can be `both`, `plain` or `html`.

This option can however overridden by Extension authors in their use cases.

All Fluid-based template paths can be configured via

* :php:`$GLOBALS['TYPO3_CONF_VARS']['MAIL']['layoutRootPaths']`
* :php:`$GLOBALS['TYPO3_CONF_VARS']['MAIL']['partialRootPaths']`
* :php:`$GLOBALS['TYPO3_CONF_VARS']['MAIL']['templateRootPaths']`

where TYPO3 reserves all array keys below `100` for internal purposes. If you want to provide custom templates or layouts,
set this in your LocalConfiguration.php / AdditionalConfiguration.php file:

* :php:`$GLOBALS['TYPO3_CONF_VARS']['MAIL']['templateRootPaths'][700] = 'EXT:my_site_extension/Resources/Private/Templates/Email';`
* :php:`$GLOBALS['TYPO3_CONF_VARS']['MAIL']['layoutRootPaths'][700] = 'EXT:my_site_extension/Resources/Private/Layouts';`


Impact
======

TYPO3 now sends out templated emails for system emails in both plaintext and HTML formats.

It is possible to use the same API in your custom extension like this:

.. code-block:: php

   $email = GeneralUtility::makeInstance(FluidEmail::class);
   $email
       ->to('contact@acme.com')
       ->from(new Address('jeremy@acme.com', 'Jeremy'))
       ->subject('TYPO3 loves you - here is why')
       ->setFormat('html') // only HTML mail
       ->setTemplate('TipsAndTricks')
       ->assign('mySecretIngredient', 'Tomato and TypoScript');
   GeneralUtility::makeInstance(Mailer::class)->send($email);

.. index:: Fluid, ext:core
