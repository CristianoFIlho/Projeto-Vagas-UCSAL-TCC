<?php
/**
 * The template for displaying the footer.
 * @package crystal
 * @since crystal 1.0
 */
    if (!is_page_template('template-coming-soon-1.php') && !is_page_template('template-coming-soon-2.php')): ?>


    <!--SOFIA INICIO-->
    <!--SOFIA HTML INICIO-->
    <div id="div_mom" class="div_mom_fechado">
            
        <div class="input-cabecalho sofia-topo">
          <img id="up" title="Maximizar" class="sofia-up-down" onclick="maximizar();PrimeiraResposta();" src="http://softwell.com.br/wp-content/themes/Crystal/chat-sofia/img/maximizar.png"></img>
          <img id="down" title="Minimizar" class="sofia-up-down" onclick="minimizar()" src="http://softwell.com.br/wp-content/themes/Crystal/chat-sofia/img/fechar.svg"></img>
          <span id="titulo" class="sofia-titulo">Olá! Meu nome é Sofia.</span><img title="Sofia" class="input-sofia sofia-img" src="http://softwell.com.br/wp-content/themes/Crystal/chat-sofia/img/Sofia_Marco.png">
        </div>
        
        <div class="sofia-chat" id="chat-sofia"></div>

        <div class="sofia-formulario">
          <input id="textofaq" class="sofia-input" type="text" maxlength="2048" onkeyup="TeclaPressionada(event)" onclick="PrimeiraResposta();maximizar();" placeholder="Como posso te ajudar?">
          <button id="btn" class="sofia-botao" name="goFaq" onclick="solicitacao(document.getElementById('textofaq').value); document.getElementById('textofaq').value='';document.getElementById('textofaq').placeholder='Posso te ajudar em algo mais?';
          maximizar();">Enviar</button>
          <button id="btn-contato" class="sofia-botao" style="">Contate-nos</button>
        </div>

    </div>

    <div id="div-invisivel" onclick="minimizar()">
    </div>
    <!--SOFIA HTML FINAL-->

    <!--MODAL HTML INICIO-->
    <div id="myModal" class="modal">
        <!-- Modal content-->
        <div class="modal-content">
            <span class="close"></span>
            <iframe id="form-contato" src="http://softwell.com.br/wp-content/uploads/2014/09/formfaq.html" scrolling="no"></iframe>
        </div>
    </div>
    <!--MODAL HTML FINAL-->

    <script src="http://softwell.com.br/wp-content/themes/Crystal/chat-sofia/js/modal-js.js"></script>
    <!--SOFIA FINAL-->




    <!-- FOOTER INICIO (TEMPLATE HTML) -->
    <footer>

    <!-- SOFIA FINAL -->

      <!-- TEMPLATE HTML INICIO -->
      <div class="container_16">
        <?php get_sidebar('footer'); ?>
        <div class="line"></div>
        <?php get_sidebar('footer2'); ?>
      </div>
      <div class="footer-bottom">
        <div class="container_16">
          <?php if (ot_get_option('footer_logo_url')):
            echo ts_get_image(ot_get_option('footer_logo_url'), 'footer-logo' , esc_attr( get_bloginfo( 'name', 'display' ) )); 
          endif;?>
          <p class="copywright">
            <?php echo ot_get_option('footer_text'); ?>
          </p>
          <?php
            $defaults = array(
              'container'     => 'nav',
              'theme_location'  => 'footer',
              'depth'       => 1
            );
            wp_nav_menu( $defaults );
          ?>
        </div>
      </div>
    </footer>
    <!-- FOOTER FINAL (TEMPLATE HTML) -->

    <!-- PERDIDO -->
    </div>
      
    <?php echo ot_get_option('scripts_footer'); ?>
    <div class="media_for_js"></div>
    <?php endif; ?>
    <?php wp_footer(); ?>
    <script type="text/javascript"> 
      _linkedin_data_partner_id = "10367";
    </script>
    <script type="text/javascript">
      (function(){var s = document.getElementsByTagName("script")[0]; var b = document.createElement("script"); b.type = "text/javascript";b.async = true; b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"; s.parentNode.insertBefore(b, s);})();
    </script>

  </body>
</html>
<!-- TEMPLATE HTML FINAL -->