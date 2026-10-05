import re

with open("src/app/app.component.html", "r") as f:
    content = f.read()

# I will find the entire v2-territory-modal-content block and replace it
# But I must first extract the Oportunidades loop and Adaptaciones loop so I don't lose them!

op_match = re.search(r'<!-- Tab Content: Oportunidades -->(.*?)<!-- Tab Content: Adaptaciones', content, re.DOTALL)
if not op_match:
    print("Could not find Oportunidades block")
    exit(1)
oportunidades_content = op_match.group(1).strip()

ad_match = re.search(r'<!-- Tab Content: Adaptaciones.*?<div class="v2-tm-content-area"[^>]*>(.*?)</div>\s*</div>\s*</ng-container>', content, re.DOTALL)
if not ad_match:
    print("Could not find Adaptaciones block")
    exit(1)
adaptaciones_content = ad_match.group(1).strip()

# Now create the new modal content
new_modal = f"""
  <div class="v2-territory-modal-content" style="display: flex; flex-direction: column; overflow: hidden; height: 100vh;">

    <!-- Top Tabs Row (Horizontal) -->
    <div class="v2-tm-header" style="border-bottom: 1px solid rgba(255,255,255,0.05); padding: 16px 40px; display: flex; align-items: center; justify-content: space-between;">
      <div class="v2-tm-header-left" style="display: flex; gap: 24px; align-items: center; overflow: hidden; flex: 1;">
        <button class="v2-tm-back-btn" (click)="closeTerritoryModal()" style="flex-shrink: 0; background: transparent; border: 1px solid rgba(255,255,255,0.1); border-radius: 50%; color: #fff; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;"><mat-icon>arrow_back</mat-icon></button>
        <div class="v2-tm-tabs-scroll" style="display: flex; gap: 12px; overflow-x: auto; padding-right: 20px;">
          <div class="v2-tm-tab" *ngFor="let ter of compassData?.geo_intelligence?.territorios; let idx = index"
            [class.active]="selectedTerritoryIndex === idx" (click)="selectedTerritoryIndex = idx">
            <div class="v2-tm-tab-num">{{{{ (idx + 1) < 10 ? '0' + (idx + 1) : (idx + 1) }}}}</div>
            <div class="v2-tm-tab-name">{{{{ ter.demografia.nombre || ('Territorio ' + (idx + 1)) }}}}</div>
          </div>
        </div>
      </div>
      <div style="display: flex; gap: 8px; flex-shrink: 0;">
        <button style="background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.1); border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer;"><mat-icon style="font-size: 20px; width: 20px; height: 20px;">chevron_left</mat-icon></button>
        <button style="background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.1); border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer;"><mat-icon style="font-size: 20px; width: 20px; height: 20px;">chevron_right</mat-icon></button>
      </div>
    </div>

    <!-- Main Body (Split Left/Right) -->
    <div class="v2-tm-body" style="display: flex; flex: 1; overflow: hidden;" *ngIf="compassData?.geo_intelligence?.territorios?.[selectedTerritoryIndex] as activeTerritory">
      
      <!-- LEFT COLUMN -->
      <div class="v2-tm-left" style="width: 440px; flex-shrink: 0; padding: 40px; border-right: 1px solid rgba(255,255,255,0.06); overflow-y: auto; display: flex; flex-direction: column;">
        
        <div style="color: #B6FF00; font-size: 13px; font-weight: 700; letter-spacing: 1px; margin-bottom: 24px;">TERRITORIO 0{{{{ selectedTerritoryIndex + 1 }}}}</div>
        
        <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 24px;">
          <div style="width: 72px; height: 72px; flex-shrink: 0; position: relative;">
            <div style="width: 100%; height: 100%; background: #1A1E1C; border-radius: 16px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.08);">
              <mat-icon style="font-size: 36px; width: 36px; height: 36px; color: #E2E8F0;">extension</mat-icon>
            </div>
            <div style="position: absolute; bottom: -12px; left: 8px; width: 36px; height: 24px;">
              <svg viewBox="0 0 100 50" width="36" height="24">
                <path d="M10,25 Q25,5 50,25 T90,25" fill="none" stroke="#B6FF00" stroke-width="12" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
          <h2 style="font-size: 36px; font-weight: 800; line-height: 1.1; margin: 0; color: #fff;" [innerHTML]="activeTerritory.demografia.nombre.replace(' + ', '<br>+ ')"></h2>
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px;">
          <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 100px; padding: 6px 16px; font-size: 13px; color: #E2E8F0;">CDMX</div>
          <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 100px; padding: 6px 16px; font-size: 13px; color: #E2E8F0;">Estado de México</div>
          <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 100px; padding: 6px 16px; font-size: 13px; color: #E2E8F0;">Zona Metropolitana</div>
        </div>

        <div style="background: #171B19; border: 1px solid #2A302D; border-radius: 20px; padding: 32px 24px; display: flex; flex-direction: column;">
          <h3 style="color: #fff; font-size: 18px; margin: 0 0 16px 0; font-weight: 700;">Resumen del territorio</h3>
          <p style="color: #A7AAA5; font-size: 14px; line-height: 1.6; margin: 0 0 40px 0;">
            {{{{ activeTerritory.cultura_local.perfil_consumidor || 'Ciudad de México es un territorio diverso, dinámico y altamente conectado, donde la salud y el bienestar forman parte de un estilo de vida activo y aspiracional.' }}}}
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px 24px;">
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div style="width: 48px; height: 48px; border-radius: 50%; background: #1A1E1C; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <mat-icon style="color: #E2E8F0; font-size: 24px; width: 24px; height: 24px;">location_city</mat-icon>
              </div>
              <div>
                <div style="color: #fff; font-size: 14px; font-weight: 600; margin-bottom: 4px;">Alta densidad urbana</div>
                <div style="color: #A7AAA5; font-size: 13px; line-height: 1.4;">Una de las zonas metropolitanas más grandes de LATAM.</div>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div style="width: 48px; height: 48px; border-radius: 50%; background: #1A1E1C; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <mat-icon style="color: #E2E8F0; font-size: 24px; width: 24px; height: 24px;">directions_run</mat-icon>
              </div>
              <div>
                <div style="color: #fff; font-size: 14px; font-weight: 600; margin-bottom: 4px;">Estilo de vida activo</div>
                <div style="color: #A7AAA5; font-size: 13px; line-height: 1.4;">Movimiento constante y rutinas dinámicas.</div>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div style="width: 48px; height: 48px; border-radius: 50%; background: #1A1E1C; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <mat-icon style="color: #E2E8F0; font-size: 24px; width: 24px; height: 24px;">devices</mat-icon>
              </div>
              <div>
                <div style="color: #fff; font-size: 14px; font-weight: 600; margin-bottom: 4px;">Alta conexión digital</div>
                <div style="color: #A7AAA5; font-size: 13px; line-height: 1.4;">Gran consumo de video y plataformas de streaming.</div>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div style="width: 48px; height: 48px; border-radius: 50%; background: #1A1E1C; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <mat-icon style="color: #E2E8F0; font-size: 24px; width: 24px; height: 24px;">favorite_border</mat-icon>
              </div>
              <div>
                <div style="color: #fff; font-size: 14px; font-weight: 600; margin-bottom: 4px;">Interés en bienestar</div>
                <div style="color: #A7AAA5; font-size: 13px; line-height: 1.4;">Creciente preocupación por la salud física y mental.</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- RIGHT COLUMN -->
      <div class="v2-tm-right" style="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #0A0D0B;">
        
        <!-- Right Column Header (Tabs & Action Buttons) -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 24px 40px; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <!-- Tabs -->
          <div style="display: flex; gap: 12px; background: rgba(255,255,255,0.03); padding: 4px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.05);">
            <button class="v2-tm-sec-tab" [class.active]="activeTerritoryTab === 'context'" (click)="activeTerritoryTab = 'context'" style="padding: 10px 32px; font-size: 15px; border-radius: 99px; font-weight: 600; border: none; cursor: pointer; transition: all 0.2s;" [style.background]="activeTerritoryTab === 'context' ? '#B6FF00' : 'transparent'" [style.color]="activeTerritoryTab === 'context' ? '#111' : '#A7AAA5'">Contexto</button>
            <button class="v2-tm-sec-tab" [class.active]="activeTerritoryTab === 'opportunities'" (click)="activeTerritoryTab = 'opportunities'" style="padding: 10px 32px; font-size: 15px; border-radius: 99px; font-weight: 600; border: none; cursor: pointer; transition: all 0.2s;" [style.background]="activeTerritoryTab === 'opportunities' ? '#B6FF00' : 'transparent'" [style.color]="activeTerritoryTab === 'opportunities' ? '#111' : '#A7AAA5'">Oportunidades</button>
            <button class="v2-tm-sec-tab" [class.active]="activeTerritoryTab === 'adaptations'" (click)="activeTerritoryTab = 'adaptations'" style="padding: 10px 32px; font-size: 15px; border-radius: 99px; font-weight: 600; border: none; cursor: pointer; transition: all 0.2s;" [style.background]="activeTerritoryTab === 'adaptations' ? '#B6FF00' : 'transparent'" [style.color]="activeTerritoryTab === 'adaptations' ? '#111' : '#A7AAA5'">Adaptaciones</button>
          </div>
          <!-- Action Buttons -->
          <div style="display: flex; align-items: center; gap: 16px;">
            <button class="v2-tm-download-btn" style="background: transparent; color: #F5F5F2; border: 1px solid rgba(255,255,255,0.2); padding: 10px 20px; border-radius: 99px; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer;"><mat-icon style="font-size: 20px; width: 20px; height: 20px;">download</mat-icon> Descargar reporte</button>
            <button class="v2-tm-close-btn" (click)="closeTerritoryModal()" style="background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1); width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;"><mat-icon style="font-size: 24px;">close</mat-icon></button>
          </div>
        </div>

        <!-- Right Column Content Area -->
        <div style="flex: 1; overflow-y: auto; padding: 40px;">

          <!-- Contexto Tab Content -->
          <div *ngIf="activeTerritoryTab === 'context'" style="display: grid; grid-template-columns: 1fr 260px; gap: 40px; height: 100%;">
            <!-- Map -->
            <div style="position: relative; border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); background: #111; min-height: 500px;">
              <div id="modal-map-container" class="ca-deckgl-container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;">
                <div id="modal-deck-tooltip" class="ca-deck-tooltip"></div>
              </div>
              <!-- Map Legend -->
              <div style="z-index: 2; position: absolute; top: 24px; right: 24px; display: flex; flex-direction: column; gap: 12px; background: rgba(23, 27, 25, 0.9); padding: 20px 24px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(8px);">
                <h4 style="color: #fff; font-size: 14px; font-weight: 700; margin: 0 0 8px 0;">GeoKeys principales</h4>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 16px; height: 16px; border-radius: 50%; background: rgba(182,255,0,0.2); border: 2px solid #B6FF00; display: flex; align-items: center; justify-content: center;"><div style="width: 8px; height: 8px; border-radius: 50%; background: #B6FF00;"></div></div>
                  <span style="color: #E2E8F0; font-size: 14px;">Bienestar</span>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 16px; height: 16px; border-radius: 50%; background: rgba(182,255,0,0.2); border: 2px solid #B6FF00; display: flex; align-items: center; justify-content: center;"><div style="width: 8px; height: 8px; border-radius: 50%; background: #B6FF00;"></div></div>
                  <span style="color: #E2E8F0; font-size: 14px;">Vida en movimiento</span>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 16px; height: 16px; border-radius: 50%; background: rgba(182,255,0,0.2); border: 2px solid #B6FF00; display: flex; align-items: center; justify-content: center;"><div style="width: 8px; height: 8px; border-radius: 50%; background: #B6FF00;"></div></div>
                  <span style="color: #E2E8F0; font-size: 14px;">Salud preventiva</span>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 16px; height: 16px; border-radius: 50%; background: rgba(182,255,0,0.2); border: 2px solid #B6FF00; display: flex; align-items: center; justify-content: center;"><div style="width: 8px; height: 8px; border-radius: 50%; background: #B6FF00;"></div></div>
                  <span style="color: #E2E8F0; font-size: 14px;">Equilibrio diario</span>
                </div>
              </div>
            </div>

            <!-- Key Data -->
            <div style="display: flex; flex-direction: column; gap: 32px; padding-top: 24px;">
              <h3 style="margin: 0; color: #fff; font-size: 20px; font-weight: 700; line-height: 1.3;">Datos clave del<br>territorio</h3>
              
              <div style="display: flex; align-items: center; gap: 16px;">
                <div style="width: 56px; height: 56px; border-radius: 50%; background: #1A1E1C; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <mat-icon style="color: #A7AAA5; font-size: 24px; width: 24px; height: 24px;">public</mat-icon>
                </div>
                <div>
                  <div style="color: #fff; font-size: 24px; font-weight: 700; line-height: 1.2;">{{{{ activeTerritory.demografia.audiencia_estimada || '21.8 M' }}}}</div>
                  <div style="color: #E2E8F0; font-size: 14px; margin-top: 4px;">Habitantes</div>
                  <div style="color: #A7AAA5; font-size: 12px;">Área metropolitana</div>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 16px;">
                <div style="width: 56px; height: 56px; border-radius: 50%; background: #1A1E1C; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <mat-icon style="color: #A7AAA5; font-size: 24px; width: 24px; height: 24px;">bar_chart</mat-icon>
                </div>
                <div>
                  <div style="color: #fff; font-size: 24px; font-weight: 700; line-height: 1.2;">92%</div>
                  <div style="color: #E2E8F0; font-size: 14px; margin-top: 4px;">Conexión digital</div>
                  <div style="color: #A7AAA5; font-size: 12px;">Usuarios de internet</div>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 16px;">
                <div style="width: 56px; height: 56px; border-radius: 50%; background: #1A1E1C; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <mat-icon style="color: #A7AAA5; font-size: 24px; width: 24px; height: 24px;">play_circle_outline</mat-icon>
                </div>
                <div>
                  <div style="color: #fff; font-size: 24px; font-weight: 700; line-height: 1.2;">4.2 h</div>
                  <div style="color: #E2E8F0; font-size: 14px; margin-top: 4px;">Consumo de video diario</div>
                  <div style="color: #A7AAA5; font-size: 12px;">Promedio por usuario</div>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 16px;">
                <div style="width: 56px; height: 56px; border-radius: 50%; background: #1A1E1C; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <mat-icon style="color: #A7AAA5; font-size: 24px; width: 24px; height: 24px;">groups</mat-icon>
                </div>
                <div>
                  <div style="color: #fff; font-size: 24px; font-weight: 700; line-height: 1.2;">68%</div>
                  <div style="color: #E2E8F0; font-size: 14px; margin-top: 4px;">Interés en bienestar</div>
                  <div style="color: #A7AAA5; font-size: 12px;">Contenido relacionado</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Oportunidades Tab Content -->
          <div *ngIf="activeTerritoryTab === 'opportunities'">
            {oportunidades_content}
          </div>

          <!-- Adaptaciones Tab Content -->
          <div *ngIf="activeTerritoryTab === 'adaptations'">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
              {adaptaciones_content}
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
"""

# Replace in file
full_modal_pattern = r'<div class="v2-territory-modal-content">.*?</div>\n\s*</div>\n\s*</div>'

new_content = re.sub(r'<div class="v2-territory-modal-content">.*</div>\n  </div>\n</div>', new_modal + '\n</div>\n</div>', content, flags=re.DOTALL)
with open("src/app/app.component.html", "w") as f:
    f.write(new_content)

print("Replacement done")
